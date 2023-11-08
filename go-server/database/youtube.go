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

func GetYoutubeAnalysisResult(userId string, videoId string) (*models.YoutubeVideoAnalyzed, error) {
	client, err := GetClient()
	if err != nil {
		return nil, err
	}
	defer client.Close()
	snap, err := client.Collection(YOUTUBE_ANALYSES_COLLECTION).
		Doc(userId).Collection(YOUTUBE_VIDEOS_COLLECTION).Doc(videoId).Get(Ctx)
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

func AddYoutubeResult(analysis *models.YoutubeAnalyzerRespBody) error {
	client, err := GetClient()
	if err != nil {
		return err
	}
	defer client.Close()

	currentTime := time.Now().UTC()
	existingResult, err := GetYoutubeAnalysisResult(analysis.UserId, analysis.VideoId)
	if err != nil {
		analysis.VideoResults.CreatedAt = currentTime
	} else {
		analysis.VideoResults.CreatedAt = existingResult.CreatedAt
	}
	analysis.VideoResults.LastUpdate = currentTime

	analysisDoc := client.Collection(YOUTUBE_ANALYSES_COLLECTION).Doc(analysis.UserId)
	if existingResult != nil {
		_, err = analysisDoc.Update(Ctx, []firestore.Update{
			{
				Path:  "usage_count",
				Value: firestore.Increment(1),
			},
		})
	} else {
		initialAnalysisDoc := models.YoutubeAnalysis{
			UserId:     analysis.UserId,
			UsageCount: 1,
		}
		_, err = analysisDoc.Set(Ctx, initialAnalysisDoc)
	}

	if err != nil {
		return err
	}

	youtubeVideoDoc := analysisDoc.Collection(YOUTUBE_VIDEOS_COLLECTION).Doc(analysis.VideoId)
	_, err = youtubeVideoDoc.Set(Ctx, analysis.VideoResults)
	if err != nil {
		return err
	}

	negativeCommentsColl := youtubeVideoDoc.Collection(YOUTUBE_NEGATIVE_COMMENTS_COLLECTION)
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

func GetYoutubeVideosPage(page int, pageSize int, userId string) (*models.YoutubeVideosRespBody, error) {
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

	analyzesDoc := client.Collection(YOUTUBE_ANALYSES_COLLECTION).Doc(userId)
	videosColl := analyzesDoc.Collection(YOUTUBE_VIDEOS_COLLECTION)

	pageVideos, totalVideos, err := GetPageFromCollection(page, pageSize, videosColl, "last_update", firestore.Desc)

	if err != nil {
		return nil, err
	}

	// Set the total count to response
	response.Count = totalVideos

	// Filling the next and previous fields
	totalPages := int(math.Ceil(float64(response.Count) / float64(pageSize)))
	baseURL := config.Config("APP_BASE_URL")
	prevPageVal := fmt.Sprintf("%s/api/youtube/videos?user_id=%s&page=%v&page_size=%v",
		baseURL, userId, page-1, pageSize)
	nextPageVal := fmt.Sprintf("%s/api/youtube/videos?user_id=%s&page=%v&page_size=%v",
		baseURL, userId, page+1, pageSize)

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

func GetNegativeCommentsPage(page int, pageSize int, userId string, videoId string) (*models.YoutubeVideoNegativeCommentsRespBody, error) {
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

	analysisDoc := client.Collection(YOUTUBE_ANALYSES_COLLECTION).Doc(userId)
	videoDoc := analysisDoc.Collection(YOUTUBE_VIDEOS_COLLECTION).Doc(videoId)
	negativeCommentsColl := videoDoc.Collection(YOUTUBE_NEGATIVE_COMMENTS_COLLECTION)

	pageComments, totalComments, err := GetPageFromCollection(page, pageSize, negativeCommentsColl, "", firestore.Asc)

	if err != nil {
		return nil, err
	}

	// Set the total count to response
	response.Count = totalComments

	// Filling the next and previous fields
	totalPages := int(math.Ceil(float64(response.Count) / float64(pageSize)))
	baseURL := config.Config("APP_BASE_URL")
	prevPageVal := fmt.Sprintf("%s/api/youtube/videos/%s/negative-comments?user_id=%s&page=%v&page_size=%v",
		baseURL, videoId, userId, page-1, pageSize)
	nextPageVal := fmt.Sprintf("%s/api/youtube/videos/%s/negative-comments?user_id=%s&page=%v&page_size=%v",
		baseURL, videoId, userId, page+1, pageSize)

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
