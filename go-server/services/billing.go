package services

import (
	"fmt"
	"gptube/config"

	"github.com/NdoleStudio/lemonsqueezy-go"
)

var LemonSqueezyAuthHeader string
var LemonClient *lemonsqueezy.Client
var LemonWebhookClient *lemonsqueezy.Client
var LemonStoreId string

func init() {
	if config.Config("ENV_MODE") == "production" {
		LemonSqueezyAuthHeader = fmt.Sprintf("Bearer %s", config.Config("LEMON_SQUEEZY_MAIN_API_KEY"))
		LemonClient = lemonsqueezy.New(lemonsqueezy.WithAPIKey(config.Config("LEMON_SQUEEZY_MAIN_API_KEY")))
		LemonWebhookClient = lemonsqueezy.New(lemonsqueezy.WithSigningSecret(config.Config("LEMON_SQUEEZY_MAIN_WEBHOOK_PASSWORD")))
		LemonStoreId = config.Config("LEMON_SQUEEZY_MAIN_STORE_ID")
	} else {
		LemonSqueezyAuthHeader = fmt.Sprintf("Bearer %s", config.Config("LEMON_SQUEEZY_TEST_API_KEY"))
		LemonClient = lemonsqueezy.New(lemonsqueezy.WithAPIKey(config.Config("LEMON_SQUEEZY_TEST_API_KEY")))
		LemonWebhookClient = lemonsqueezy.New(lemonsqueezy.WithSigningSecret(config.Config("LEMON_SQUEEZY_TEST_WEBHOOK_PASSWORD")))
		LemonStoreId = config.Config("LEMON_SQUEEZY_TEST_STORE_ID")
	}
}
