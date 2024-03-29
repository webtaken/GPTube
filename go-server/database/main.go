package database

import (
	"context"
	"fmt"
	"gptube/config"

	"google.golang.org/api/option"
)

// RELATIONS MODEL: https://excalidraw.com/#json=El2YZ_1cylEftfyJ0op57,kWn7gvhTzWNN__wxXBJcHA
const (
	USERS_COLLECTION = "Users"
	// Billing collection names
	SUBSCRIPTION_PLANS_COLLECTION = "SubscriptionPlans"
	SUBSCRIPTIONS_COLLECTION      = "Subscriptions"
	// Youtube Analyses Collections
	YOUTUBE_ANALYSES_COLLECTION          = "YoutubeAnalyses"
	YOUTUBE_NEGATIVE_COMMENTS_COLLECTION = "NegativeComments"
	YOUTUBE_VIDEOS_COLLECTION            = "Videos"
)

var Ctx context.Context
var Sa option.ClientOption

func init() {
	Ctx = context.Background()
	fmt.Printf("Firebase setup in %s mode.\n", config.Config("ENV_MODE"))
	Sa = option.WithCredentialsJSON([]byte(config.Config("DB_KEYS")))
}
