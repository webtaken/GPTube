package database

import (
	"errors"
	"fmt"
	"gptube/config"
	"gptube/models"
	"log"
	"math"
	"time"

	"cloud.google.com/go/firestore"
)

func GetYoutubeResult(emailUser string, videoID string) (*models.YoutubeVideoAnalyzed, error) {
	client, err := GetClient()
	if err != nil {
		return nil, err
	}
	defer client.Close()
	snap, err := client.Collection("users").
		Doc(emailUser).Collection("youtube").Doc(videoID).Get(Ctx)
	if err != nil {
		return nil, err
	}
	var result models.YoutubeVideoAnalyzed
	snap.DataTo(&result)
	return &result, nil
}

func AddYoutubeResult(results *models.YoutubeAnalyzerRespBody) error {
	client, err := GetClient()
	if err != nil {
		return err
	}
	defer client.Close()

	currentTime := time.Now().UTC()
	existingResult, err := GetYoutubeResult(results.AccountEmail, results.VideoId)
	if err != nil {
		results.VideoResults.CreatedAt = currentTime
	} else {
		results.VideoResults.CreatedAt = existingResult.CreatedAt
	}
	results.VideoResults.LastUpdate = currentTime

	userDoc := client.Collection("users").Doc(results.AccountEmail)
	if existingResult != nil {
		_, err = userDoc.Update(Ctx, []firestore.Update{
			{
				Path:  "usageLimitYoutube",
				Value: firestore.Increment(1),
			},
		})
	} else {
		_, err = userDoc.Set(Ctx, map[string]interface{}{
			"email":             results.AccountEmail,
			"usageLimitYoutube": 1,
		})
	}

	if err != nil {
		return err
	}

	youtubeDoc := userDoc.Collection("youtube").Doc(results.VideoId)
	_, err = youtubeDoc.Set(Ctx, results)
	if err != nil {
		return err
	}

	negativeCommentsColl := youtubeDoc.Collection("NegativeComments")
	for _, comment := range results.VideoResults.NegativeComments {
		_, err = negativeCommentsColl.Doc(comment.Id).Get(Ctx)
		if err != nil {
			// Comment doesn't exists we need to insert it
			fmt.Printf("[AddYoutubeResult] Comment with ID %v doesn't exists inserting...\n", comment.Id)
			_, err = negativeCommentsColl.Doc(comment.Id).Set(Ctx, comment)
			if err != nil {
				log.Printf("[AddYoutubeResult] Failed to add negative comment %v: %v",
					comment.Id, err)
			}
			continue
		}
	}

	return nil
}

func GetYoutubeVideosPage(page int, pageSize int, accountEmail string) (*models.YoutubeVideosRespBody, error) {
	client, err := GetClient()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	response := &models.YoutubeVideosRespBody{
		Count:    0,
		Next:     nil,
		Previous: nil,
		Results:  make([]models.YoutubeVideoDashboard, 0),
	}

	userDoc := client.Collection("users").Doc(accountEmail)
	youtubeColl := userDoc.Collection("youtube")

	// Query the page
	query := youtubeColl.OrderBy("last_update", firestore.Desc).Limit(pageSize)
	if page > 1 {
		prevPageSnapshot, err := youtubeColl.OrderBy("last_update", firestore.Desc).
			Limit(pageSize * (page - 1)).Documents(Ctx).GetAll()
		if err != nil {
			return nil, err
		}
		lastDoc := prevPageSnapshot[len(prevPageSnapshot)-1]
		query = youtubeColl.OrderBy("last_update", firestore.Desc).
			StartAfter(lastDoc.Data()["last_update"]).Limit(pageSize)
	}
	pageSnapshot, err := query.Documents(Ctx).GetAll()
	if err != nil {
		return nil, err
	}
	if len(pageSnapshot) == 0 {
		return nil, errors.New("could not receive any result")
	}

	// Count all the youtube videos in the collection
	response.Count, err = CountCollection(youtubeColl)
	if err != nil {
		return nil, err
	}

	// Filling the next and previous fields
	totalPages := int(math.Ceil(float64(response.Count) / float64(pageSize)))
	baseURL := config.Config("APP_BASE_URL")
	prevPageVal := fmt.Sprintf("%s/api/youtube/videos?account_email=%s&page=%v&page_size=%v",
		baseURL, accountEmail, page-1, pageSize)
	nextPageVal := fmt.Sprintf("%s/api/youtube/videos?account_email=%s&page=%v&page_size=%v",
		baseURL, accountEmail, page+1, pageSize)

	if 1 <= page && page <= totalPages {
		response.Previous = &prevPageVal
		response.Next = &nextPageVal
		if page == 1 {
			response.Previous = nil
		}
		if page == totalPages {
			response.Next = nil
		}
	} else {
		return nil, errors.New("page range error")
	}

	// Filling the results array
	for _, snapshot := range pageSnapshot {
		var videoResult models.YoutubeVideoDashboard
		snapshot.DataTo(&videoResult)
		response.Results = append(response.Results, videoResult)
	}

	return response, nil
}
