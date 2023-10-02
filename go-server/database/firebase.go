package database

import (
	"context"
	"fmt"
	"gptube/config"
	"gptube/models"
	"log"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

var Ctx context.Context
var Sa option.ClientOption

func init() {
	Ctx = context.Background()
	fmt.Printf("Firebase setup in %s mode.\n", config.Config("ENV_MODE"))
	if config.Config("ENV_MODE") == "development" {
		Sa = option.WithCredentialsJSON([]byte(config.Config("DB_KEYS_DEVELOPMENT")))
	} else {
		Sa = option.WithCredentialsJSON([]byte(config.Config("DB_KEYS_PRODUCTION")))
	}
}

func GetClient() (*firestore.Client, error) {
	app, err := firebase.NewApp(Ctx, nil, Sa)
	if err != nil {
		return nil, err
	}
	client, err := app.Firestore(Ctx)
	if err != nil {
		return nil, err
	}
	return client, nil
}

func GetYoutubeResult(emailUser string, videoID string) (*models.YoutubeAnalyzerRespBody, error) {
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
	var result models.YoutubeAnalyzerRespBody
	snap.DataTo(&result)
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

func AddYoutubeResult(results *models.YoutubeAnalyzerRespBody) error {
	app, err := firebase.NewApp(Ctx, nil, Sa)
	if err != nil {
		return err
	}

	client, err := app.Firestore(Ctx)
	if err != nil {
		return err
	}

	defer client.Close()

	currentTime := time.Now().UTC()
	existingResult, err := GetYoutubeResult(results.OwnerEmail, results.VideoID)
	if err != nil {
		results.CreatedAt = currentTime
	} else {
		results.CreatedAt = existingResult.CreatedAt
	}
	results.LastUpdate = currentTime

	userDoc := client.Collection("users").Doc(results.OwnerEmail)
	if existingResult != nil {
		_, err = userDoc.Update(Ctx, []firestore.Update{
			{
				Path:  "usageLimitYoutube",
				Value: firestore.Increment(1),
			},
		})
	} else {
		_, err = userDoc.Set(Ctx, map[string]interface{}{
			"email":             results.OwnerEmail,
			"usageLimitYoutube": 1,
		})
	}

	if err != nil {
		return err
	}

	youtubeDoc := userDoc.Collection("youtube").Doc(results.VideoID)
	_, err = youtubeDoc.Set(Ctx, results)
	if err != nil {
		return err
	}

	negativeCommentsColl := youtubeDoc.Collection("NegativeComments")
	for _, comment := range results.Results.NegativeComments {
		_, err = negativeCommentsColl.Doc(comment.CommentID).Set(Ctx, comment)
		if err != nil {
			log.Printf("Failed to add negative comment: %v", err)
		}
	}
	return nil
}

func AddYoutubeLandingResult(results *models.YoutubeAnalyzerLandingRespBody) error {
	app, err := firebase.NewApp(Ctx, nil, Sa)
	if err != nil {
		return err
	}

	client, err := app.Firestore(Ctx)
	if err != nil {
		return err
	}

	defer client.Close()

	currentTime := time.Now().UTC()
	_, err = GetYoutubeLandingResult(results.VideoID)
	if err != nil {
		// It means the object does not exist on the database
		results.CreatedAt = currentTime
		landingDoc := client.Collection("landing").Doc(results.VideoID)
		_, err = landingDoc.Set(Ctx, results)
		if err != nil {
			return err
		}
		return nil
	}

	return nil
}

func RetrieveSubscriptions(email string) (*[]map[string]interface{}, error) {
	app, err := firebase.NewApp(Ctx, nil, Sa)
	if err != nil {
		return nil, err
	}

	client, err := app.Firestore(Ctx)
	if err != nil {
		return nil, err
	}

	defer client.Close()

	subscriptionsQuery := client.Collection("subscriptions").Where("user_email", "==", email)
	subscriptions := subscriptionsQuery.Documents(Ctx)
	results := make([]map[string]interface{}, 0)
	for {
		doc, err := subscriptions.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		results = append(results, doc.Data())
	}
	return &results, nil
}
