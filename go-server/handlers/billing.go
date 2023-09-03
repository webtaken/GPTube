package handlers

import (
	"context"
	"fmt"
	"gptube/config"
	"gptube/database"
	"gptube/models"
	"gptube/utils"
	"net/http"
	"time"

	firebase "firebase.google.com/go"
	"github.com/NdoleStudio/lemonsqueezy-go"
	"github.com/gofiber/fiber/v2"
	"google.golang.org/api/iterator"
)

var lemonSqueezyAuthHeader = fmt.Sprintf("Bearer %s", config.Config("LEMON_SQUEEZY_API_KEY"))
var lemonClient = lemonsqueezy.New(lemonsqueezy.WithAPIKey(config.Config("LEMON_SQUEEZY_API_KEY")))
var lemonWebhookClient = lemonsqueezy.New(lemonsqueezy.WithSigningSecret(config.Config("LEMON_SQUEEZY_WEBHOOK_PASSWORD")))

func BillingProducts(c *fiber.Ctx) error {
	allVariants, _, err := lemonClient.Variants.List(context.Background())
	if err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}
	return c.JSON(allVariants)
}

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

func BillingSubscriptions(c *fiber.Ctx) error {
	userEmail := c.Query("user_email", "")
	if userEmail == "" {
		err := fmt.Errorf("please add the 'user_email' query param")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}
	subscriptions, err := database.RetrieveSubscriptions(userEmail)
	if err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}
	return c.JSON(fiber.Map{
		"count":         len(*subscriptions),
		"subscriptions": *subscriptions,
	})
}

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

func BillingUpdatePaymentMethod(c *fiber.Ctx) error {
	subscriptionId := c.Query("subscription_id", "")
	if subscriptionId == "" {
		err := fmt.Errorf("please add the 'subscription_id' query param")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}
	subscription, _, err := lemonClient.Subscriptions.Get(context.Background(), subscriptionId)
	if err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}
	return c.JSON(subscription)
}

func BillingCancelSubscription(c *fiber.Ctx) error {
	subscriptionId := c.Query("subscription_id", "")
	if subscriptionId == "" {
		err := fmt.Errorf("please add the 'subscription_id' query param")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}
	_, _, err := lemonClient.Subscriptions.Cancel(context.Background(), subscriptionId)
	if err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}
	return c.SendStatus(http.StatusOK)
}

func BillingResumeSubscription(c *fiber.Ctx) error {
	subscriptionId := c.Query("subscription_id", "")
	if subscriptionId == "" {
		err := fmt.Errorf("please add the 'subscription_id' query param")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}
	subscriptionParams := &lemonsqueezy.SubscriptionUpdateParams{
		ID: subscriptionId,
		Attributes: lemonsqueezy.SubscriptionUpdateParamsAttributes{
			Cancelled: false,
		},
	}
	_, _, err := lemonClient.Subscriptions.Update(context.Background(), subscriptionParams)
	if err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}
	return c.SendStatus(http.StatusOK)
}

func billingUpdateSubscription() error {
	app, err := firebase.NewApp(database.Ctx, nil, database.Sa)
	if err != nil {
		return err
	}

	client, err := app.Firestore(database.Ctx)
	if err != nil {
		return err
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

func BillingSubscriptionsWebhooks(c *fiber.Ctx) error {
	headers := c.GetReqHeaders()
	signature := headers["X-Signature"]

	isValidReqBody := lemonWebhookClient.Webhooks.Verify(
		context.Background(), signature, c.Body())

	if isValidReqBody {
		var webhookBody lemonsqueezy.WebhookRequest[lemonsqueezy.Subscription, lemonsqueezy.ApiResponseRelationshipsSubscription]

		if err := c.BodyParser(&webhookBody); err != nil {
			c.JSON(fiber.Map{
				"error": fmt.Errorf("%v", err).Error(),
			})
			return c.SendStatus(http.StatusInternalServerError)
		}

		fmt.Println(webhookBody.Meta.EventName)

		return c.JSON(fiber.Map{
			"message": "webhook received correctly",
		})
	}

	c.Status(http.StatusInternalServerError)
	return c.JSON(fiber.Map{
		"message": "error while validating the signature",
	})
}
