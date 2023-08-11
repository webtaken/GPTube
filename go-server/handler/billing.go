package handler

import (
	"context"
	"fmt"
	"gptube/config"
	"gptube/models"
	"gptube/utils"
	"net/http"
	"time"

	"github.com/NdoleStudio/lemonsqueezy-go"
	"github.com/gofiber/fiber/v2"
)

var lemonSqueezyAuthHeader = fmt.Sprintf("Bearer %s", config.Config("LEMON_SQUEEZY_API_KEY"))
var lemonClient = lemonsqueezy.New(lemonsqueezy.WithAPIKey(config.Config("LEMON_SQUEEZY_API_KEY")))

func BillingCheckout(c *fiber.Ctx) error {
	variantId := c.Query("variantId", "")
	checkoutParams := &lemonsqueezy.CheckoutCreateParams{
		StoreID:         config.Config("LEMON_SQUEEZY_STORE_ID"),
		VariantID:       variantId,
		ExpiresAt:       time.Now().Add(24 * time.Hour),
		EnabledVariants: make([]int, 0),
		ButtonColor:     "#D91E1E",
		CustomData: map[string]string{
			"message": "creating checkout",
		},
	}
	checkout, _, err := lemonClient.Checkouts.Create(context.Background(), checkoutParams)
	if err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}
	return c.JSON(checkout)
}

// func BillingSubscriptionInvoices(c *fiber.Ctx) error {

// }

func BillingSubscriptionInvoices(c *fiber.Ctx) error {
	var body models.InvoicesRequest
	if err := c.BodyParser(&body); err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	var invoices lemonsqueezy.SubscriptionInvoicesApiResponse
	agent := fiber.AcquireAgent()
	agent.ContentType("application/json")
	agent.Set("Authorization", lemonSqueezyAuthHeader)
	req := agent.Request()
	req.Header.SetMethod(fiber.MethodGet)
	req.SetRequestURI(fmt.Sprintf("%s/subscription-invoices", config.Config("LEMON_SQUEEZY_API_URL")))
	agent.QueryString(
		fmt.Sprintf("filter[subscription_id]=%v&page[number]=%v&page[size]=%v",
			body.SubscriptionId, body.Page, body.PageSize),
	)

	if err := agent.Parse(); err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	statusCode, _, errs := agent.Struct(&invoices)
	if statusCode != http.StatusOK && len(errs) > 0 {
		return utils.HandleError(errs[0], http.StatusInternalServerError, c)
	}

	return c.JSON(invoices)
}
