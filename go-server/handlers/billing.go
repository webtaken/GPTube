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

func billingCreateSubscriptionWebhookHandler(
	subscription *lemonsqueezy.WebhookRequest[lemonsqueezy.Subscription,
		lemonsqueezy.ApiResponseRelationshipsSubscription]) error {
	app, err := firebase.NewApp(database.Ctx, nil, database.Sa)
	if err != nil {
		return err
	}

	client, err := app.Firestore(database.Ctx)
	if err != nil {
		return err
	}

	defer client.Close()

	newSubscriptionFirestore := models.SubscriptionFirestore{
		UserEmail:           subscription.Data.Attributes.UserEmail,
		SubscriptionId:      subscription.Data.ID,
		OrderId:             subscription.Data.Attributes.OrderID,
		ProductId:           subscription.Data.Attributes.ProductID,
		VariantId:           subscription.Data.Attributes.VariantID,
		CustomerId:          0,
		ProductName:         subscription.Data.Attributes.ProductName,
		Status:              subscription.Data.Attributes.Status,
		StatusFormatted:     subscription.Data.Attributes.StatusFormatted,
		TrialEndsAt:         subscription.Data.Attributes.TrialEndsAt.String(),
		RenewsAt:            subscription.Data.Attributes.RenewsAt.String(),
		EndsAt:              subscription.Data.Attributes.EndsAt.String(),
		CreatedAt:           subscription.Data.Attributes.CreatedAt.String(),
		CardBrand:           "",
		CardLastFour:        "",
		UpdatePaymentMethod: subscription.Data.Attributes.Urls.UpdatePaymentMethod,
	}

	_, err = client.Collection("subscriptions").Doc(subscription.Data.ID).
		Set(database.Ctx, newSubscriptionFirestore)
	if err != nil {
		return fmt.Errorf("An error has occurred: %s", err)
	}

	return nil
}

func billingUpdateSubscriptionWebhookHandler(
	subscription *lemonsqueezy.WebhookRequest[
		lemonsqueezy.Subscription,
		lemonsqueezy.ApiResponseRelationshipsSubscription]) error {
	app, err := firebase.NewApp(database.Ctx, nil, database.Sa)
	if err != nil {
		return err
	}

	client, err := app.Firestore(database.Ctx)
	if err != nil {
		return err
	}

	defer client.Close()

	fmt.Println("updating subscription")

	return nil
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

		eventHandlers := make(map[string]func(
			subscription *lemonsqueezy.WebhookRequest[
				lemonsqueezy.Subscription,
				lemonsqueezy.ApiResponseRelationshipsSubscription]) error)
		eventHandlers["subscription_created"] = billingCreateSubscriptionWebhookHandler
		eventHandlers["subscription_updated"] = billingUpdateSubscriptionWebhookHandler

		handler, ok := eventHandlers[webhookBody.Meta.EventName]
		if !ok {
			utils.HandleError(
				fmt.Errorf("event not registered on the webhook"),
				http.StatusInternalServerError, c)
		}

		handler(&webhookBody)

		return c.JSON(fiber.Map{
			"message": "webhook received correctly",
		})
	}

	c.Status(http.StatusInternalServerError)
	return c.JSON(fiber.Map{
		"message": "error while validating the signature",
	})
}
