package database

import (
	"context"
	"fmt"
	"gptube/config"

	"google.golang.org/api/option"
)

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
	if config.Config("ENV_MODE") == "development" {
		Sa = option.WithCredentialsJSON([]byte(config.Config("DB_KEYS_DEVELOPMENT")))
	} else {
		Sa = option.WithCredentialsJSON([]byte(config.Config("DB_KEYS_PRODUCTION")))
	}
}
