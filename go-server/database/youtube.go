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
	"google.golang.org/api/youtube/v3"
)

const (
	usersCollName            = "users"
	youtubeCollName          = "youtube"
	negativeCommentsCollName = "NegativeComments"
)

func GetYoutubeResult(emailUser string, videoId string) (*models.YoutubeVideoAnalyzed, error) {
	client, err := GetClient()
	if err != nil {
		return nil, err
	}
	defer client.Close()
	snap, err := client.Collection("users").
		Doc(emailUser).Collection("youtube").Doc(videoId).Get(Ctx)
	if err != nil {
		return nil, err
	}
	var result models.YoutubeVideoAnalyzed
	err = snap.DataTo(&result)
	if err != nil {
		return nil, err
	}
	return &result, nil
}

func GetYoutubeLandingResult(videoID string) (*models.YoutubeAnalyzerLandingRespBody, error) {
	client, err := GetClient()
	if err != nil {
		return nil, err
	}
	defer client.Close()
	snap, err := client.Collection("landing").Doc(videoID).Get(Ctx)
	if err != nil {
		return nil, err
	}
	var result models.YoutubeAnalyzerLandingRespBody
	snap.DataTo(&result)
	return &result, nil
}

func AddYoutubeResult(analysis *models.YoutubeAnalyzerRespBody) error {
	client, err := GetClient()
	if err != nil {
		return err
	}
	defer client.Close()

	currentTime := time.Now().UTC()
	existingResult, err := GetYoutubeResult(analysis.AccountEmail, analysis.VideoId)
	if err != nil {
		analysis.VideoResults.CreatedAt = currentTime
	} else {
		analysis.VideoResults.CreatedAt = existingResult.CreatedAt
	}
	analysis.VideoResults.LastUpdate = currentTime

	userDoc := client.Collection("users").Doc(analysis.AccountEmail)
	if existingResult != nil {
		_, err = userDoc.Update(Ctx, []firestore.Update{
			{
				Path:  "usageLimitYoutube",
				Value: firestore.Increment(1),
			},
		})
	} else {
		_, err = userDoc.Set(Ctx, map[string]interface{}{
			"email":             analysis.AccountEmail,
			"usageLimitYoutube": 1,
		})
	}

	if err != nil {
		return err
	}

	youtubeDoc := userDoc.Collection("youtube").Doc(analysis.VideoId)
	_, err = youtubeDoc.Set(Ctx, analysis.VideoResults)
	if err != nil {
		return err
	}

	negativeCommentsColl := youtubeDoc.Collection("NegativeComments")
	for _, comment := range analysis.VideoResults.NegativeComments {
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

	pageVideos, totalVideos, err := GetPageFromCollection(page, pageSize, youtubeColl, "last_update", firestore.Desc)

	if err != nil {
		return nil, err
	}

	// Set the total count to response
	response.Count = totalVideos

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
	for _, snapshot := range pageVideos {
		var videoResult models.YoutubeVideoDashboard
		snapshot.DataTo(&videoResult)
		response.Results = append(response.Results, videoResult)
	}

	return response, nil
}

func GetNegativeCommentsPage(page int, pageSize int, accountEmail string, videoId string) (*models.YoutubeVideoNegativeCommentsRespBody, error) {
	client, err := GetClient()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	response := &models.YoutubeVideoNegativeCommentsRespBody{
		Count:    0,
		Next:     nil,
		Previous: nil,
		Results:  make([]*youtube.Comment, 0),
	}

	userDoc := client.Collection(usersCollName).Doc(accountEmail)
	videoDoc := userDoc.Collection(youtubeCollName).Doc(videoId)
	negativeCommentsColl := videoDoc.Collection(negativeCommentsCollName)

	pageComments, totalComments, err := GetPageFromCollection(page, pageSize, negativeCommentsColl, "", firestore.Asc)

	if err != nil {
		return nil, err
	}

	// Set the total count to response
	response.Count = totalComments

	// Filling the next and previous fields
	totalPages := int(math.Ceil(float64(response.Count) / float64(pageSize)))
	baseURL := config.Config("APP_BASE_URL")
	prevPageVal := fmt.Sprintf("%s/api/youtube/videos/%s/negative-comments?account_email=%s&page=%v&page_size=%v",
		baseURL, videoId, accountEmail, page-1, pageSize)
	nextPageVal := fmt.Sprintf("%s/api/youtube/videos/%s/negative-comments?account_email=%s&page=%v&page_size=%v",
		baseURL, videoId, accountEmail, page+1, pageSize)

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
	for _, snapshot := range pageComments {
		var commentResult youtube.Comment
		snapshot.DataTo(&commentResult)
		response.Results = append(response.Results, &commentResult)
	}

	return response, nil
}
