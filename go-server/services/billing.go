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
	LemonSqueezyAuthHeader = fmt.Sprintf("Bearer %s", config.Config("LEMON_SQUEEZY_API_KEY"))
	LemonClient = lemonsqueezy.New(lemonsqueezy.WithAPIKey(config.Config("LEMON_SQUEEZY_API_KEY")))
	LemonWebhookClient = lemonsqueezy.New(lemonsqueezy.WithSigningSecret(config.Config("LEMON_SQUEEZY_WEBHOOK_PASSWORD")))
	LemonStoreId = config.Config("LEMON_SQUEEZY_STORE_ID")
}
