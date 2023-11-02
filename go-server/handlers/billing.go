package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"gptube/config"
	"gptube/database"
	"gptube/models"
	"gptube/services"
	"gptube/utils"
	"net/http"
	"strings"
	"time"

	"github.com/NdoleStudio/lemonsqueezy-go"
	"github.com/gofiber/fiber/v2"
)

// @Summary		Get the subscription plans offered by GPTube
// @Description	An endpoint to retrieve the subscription plan offered by GPTube with its price, features, etc.
// @Produce		json
// @Success		200	{array}		models.SubscriptionPlan
// @Failure		500	{object}	fiber.Error
// @Router			/billing/subscription-plans [get]
func BillingSubscriptionPlans(c *fiber.Ctx) error {
	var subscriptionPlans map[models.SubscriptionPlanSlug]*models.SubscriptionPlan
	var err error
	if config.Config("ENV_MODE") == "production" {
		subscriptionPlans, err = database.GetSubscriptionPlansProduction()
	} else if config.Config("ENV_MODE") == "development" {
		subscriptionPlans, err = database.GetSubscriptionPlansDevelopment()
	} else {
		return fiber.NewError(http.StatusInternalServerError, "error while retrieving subscription plans")
	}
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError, "error while retrieving subscription plans")
	}
	var arrSubscriptionPlans []models.SubscriptionPlan
	for _, subPlan := range subscriptionPlans {
		arrSubscriptionPlans = append(arrSubscriptionPlans, *subPlan)
	}
	return c.Status(http.StatusOK).JSON(arrSubscriptionPlans)
}

// @Summary		Get the checkout URL for a subscription plan
// @Description	An endpoint to retrieve the URL for a subscription plan sending
// @Description	the account email as well.
// @Produce		json
// @Param			variant_id		query		string	true	"the variant id of the subscription plan"
// @Param			account_email	query		string	true	"the account email"
// @Success		200				{object}	lemonsqueezy.ApiResponse[lemonsqueezy.CheckoutAttributes, lemonsqueezy.ApiResponseRelationshipsDiscount]
// @Failure		400				{object}	fiber.Error
// @Failure		500				{object}	fiber.Error
// @Router			/billing/checkout [get]
func BillingCheckout(c *fiber.Ctx) error {
	variantId := strings.TrimSpace(c.Query("variant_id", ""))
	userEmail := strings.TrimSpace(c.Query("account_email", ""))

	if variantId == "" || userEmail == "" {
		return fiber.NewError(http.StatusBadRequest, "please provide a variant id and an account email")
	}

	checkoutParams := &lemonsqueezy.CheckoutCreateParams{
		StoreID:         services.LemonStoreId,
		VariantID:       variantId,
		ExpiresAt:       time.Now().Add(24 * time.Hour), // expires in 24 hours
		EnabledVariants: make([]int, 0),
		ButtonColor:     "#81F7AC",
		CustomData: map[string]string{
			"gptube_account_email": userEmail,
		},
	}
	checkout, _, err := services.LemonClient.Checkouts.Create(context.Background(), checkoutParams)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError,
			"Error while trying to get the checkout URL, try again later.")
	}
	return c.Status(http.StatusOK).JSON(checkout)
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

// @Summary		Get the latest Invoices from a subscription
// @Description	An endpoint to retrieve the invoices from a user's subscription
// @Produce		json
// @Param			variant_id		query		string	true	"the variant id of the subscription plan"
// @Param			account_email	query		string	true	"the account email"
// @Success		200				{object}	lemonsqueezy.ApiResponse[lemonsqueezy.CheckoutAttributes, lemonsqueezy.ApiResponseRelationshipsDiscount]
// @Failure		400				{object}	fiber.Error
// @Failure		500				{object}	fiber.Error
// @Router			/billing/checkout [get]
func BillingSubscriptionInvoices(c *fiber.Ctx) error {
	var body models.InvoicesRequest
	if err := c.BodyParser(&body); err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	var invoices lemonsqueezy.SubscriptionInvoicesApiResponse
	agent := fiber.AcquireAgent()
	agent.ContentType("application/json")
	agent.Set("Authorization", services.LemonSqueezyAuthHeader)
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
	subscription, _, err := services.LemonClient.Subscriptions.Get(context.Background(), subscriptionId)
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
	_, _, err := services.LemonClient.Subscriptions.Cancel(context.Background(), subscriptionId)
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
	_, _, err := services.LemonClient.Subscriptions.Update(context.Background(), subscriptionParams)
	if err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}
	return c.SendStatus(http.StatusOK)
}

func billingCreateSubscriptionWebhookHandler(
	subscription *lemonsqueezy.WebhookRequest[lemonsqueezy.Subscription,
		lemonsqueezy.ApiResponseRelationshipsSubscription]) error {
	client, err := database.GetClient()
	if err != nil {
		return err
	}

	defer client.Close()

	gptubeAccountEmail := subscription.Meta.CustomData["gptube_account_email"]
	if gptubeAccountEmail == nil {
		gptubeAccountEmail = subscription.Data.Attributes.UserEmail
	}
	newSubscriptionFirestore := models.Subscription{
		UserEmail:           subscription.Data.Attributes.UserEmail,
		SubscriptionId:      subscription.Data.ID,
		OrderId:             subscription.Data.Attributes.OrderID,
		ProductId:           subscription.Data.Attributes.ProductID,
		VariantId:           subscription.Data.Attributes.VariantID,
		CustomerId:          subscription.Data.Attributes.CustomerID,
		ProductName:         subscription.Data.Attributes.ProductName,
		Status:              subscription.Data.Attributes.Status,
		StatusFormatted:     subscription.Data.Attributes.StatusFormatted,
		TrialEndsAt:         subscription.Data.Attributes.TrialEndsAt,
		RenewsAt:            subscription.Data.Attributes.RenewsAt,
		EndsAt:              subscription.Data.Attributes.EndsAt,
		CreatedAt:           subscription.Data.Attributes.CreatedAt,
		UpdatedAt:           subscription.Data.Attributes.UpdatedAt,
		CardBrand:           subscription.Data.Attributes.CardBrand,
		CardLastFour:        subscription.Data.Attributes.CardLastFour,
		UpdatePaymentMethod: subscription.Data.Attributes.Urls.UpdatePaymentMethod,
	}

	fmt.Printf("[billingCreateSubscriptionWebhookHandler] creating subscription %s for user %s\n",
		subscription.Data.ID, gptubeAccountEmail)
	userDoc := client.Collection("users").Doc(gptubeAccountEmail.(string))
	_, err = userDoc.Collection("subscriptions").Doc(subscription.Data.ID).
		Set(database.Ctx, newSubscriptionFirestore)
	if err != nil {
		return fmt.Errorf("an error has occurred: %s", err)
	}

	return nil
}

func billingUpdateSubscriptionWebhookHandler(
	subscription *lemonsqueezy.WebhookRequest[
		lemonsqueezy.Subscription,
		lemonsqueezy.ApiResponseRelationshipsSubscription]) error {
	client, err := database.GetClient()
	if err != nil {
		return err
	}
	defer client.Close()

	gptubeAccountEmail := subscription.Meta.CustomData["gptube_account_email"]
	if gptubeAccountEmail == nil {
		gptubeAccountEmail = subscription.Data.Attributes.UserEmail
	}
	updatedSubscriptionFirestore := models.Subscription{
		UserEmail:           subscription.Data.Attributes.UserEmail,
		SubscriptionId:      subscription.Data.ID,
		OrderId:             subscription.Data.Attributes.OrderID,
		ProductId:           subscription.Data.Attributes.ProductID,
		VariantId:           subscription.Data.Attributes.VariantID,
		CustomerId:          subscription.Data.Attributes.CustomerID,
		ProductName:         subscription.Data.Attributes.ProductName,
		Status:              subscription.Data.Attributes.Status,
		StatusFormatted:     subscription.Data.Attributes.StatusFormatted,
		TrialEndsAt:         subscription.Data.Attributes.TrialEndsAt,
		RenewsAt:            subscription.Data.Attributes.RenewsAt,
		EndsAt:              subscription.Data.Attributes.EndsAt,
		CreatedAt:           subscription.Data.Attributes.CreatedAt,
		UpdatedAt:           subscription.Data.Attributes.UpdatedAt,
		CardBrand:           subscription.Data.Attributes.CardBrand,
		CardLastFour:        subscription.Data.Attributes.CardLastFour,
		UpdatePaymentMethod: subscription.Data.Attributes.Urls.UpdatePaymentMethod,
	}

	fmt.Printf("[billingUpdateSubscriptionWebhookHandler] updating subscription %s for user %s\n",
		subscription.Data.ID, gptubeAccountEmail)
	userDoc := client.Collection("users").Doc(gptubeAccountEmail.(string))
	_, err = userDoc.Collection("subscriptions").Doc(subscription.Data.ID).
		Set(database.Ctx, updatedSubscriptionFirestore)
	if err != nil {
		return fmt.Errorf("an error has occurred: %s", err)
	}

	return nil
}

func BillingSubscriptionsWebhooks(c *fiber.Ctx) error {
	headers := c.GetReqHeaders()
	signature := headers["X-Signature"]

	isValidReqBody := services.LemonWebhookClient.Webhooks.Verify(
		context.Background(), signature, c.Body())

	if isValidReqBody {
		var webhookBody lemonsqueezy.WebhookRequest[lemonsqueezy.Subscription, lemonsqueezy.ApiResponseRelationshipsSubscription]

		if err := c.BodyParser(&webhookBody); err != nil {
			return fiber.NewError(http.StatusInternalServerError, err.Error())
		}

		defer func() {
			fmt.Printf("[BillingSubscriptionsWebhooks] event %s handled correctly\n", webhookBody.Meta.EventName)
		}()

		prettyJSON, err := json.MarshalIndent(webhookBody, "", "  ")
		if err != nil {
			return utils.HandleError(err, http.StatusInternalServerError, c)
		}

		eventHandlers := make(map[string]func(
			subscription *lemonsqueezy.WebhookRequest[
				lemonsqueezy.Subscription,
				lemonsqueezy.ApiResponseRelationshipsSubscription]) error)

		switch webhookBody.Meta.EventName {
		case "subscription_payment_success",
			"subscription_payment_failed",
			"subscription_payment_recovered",
			"subscription_cancelled",
			"subscription_expired":
			return c.Status(http.StatusOK).JSON(fiber.Map{
				"message": "webhook received correctly",
			})
		}

		fmt.Printf("[BillingSubscriptionsWebhooks]\npayload body: %s\n", string(prettyJSON))
		eventHandlers["subscription_created"] = billingCreateSubscriptionWebhookHandler
		eventHandlers["subscription_updated"] = billingUpdateSubscriptionWebhookHandler

		handler, ok := eventHandlers[webhookBody.Meta.EventName]
		if !ok {
			return fiber.NewError(http.StatusInternalServerError,
				"event not registered on the webhook")
		}
		err = handler(&webhookBody)
		if err != nil {
			return fiber.NewError(http.StatusInternalServerError, err.Error())
		}
		return c.Status(http.StatusOK).JSON(fiber.Map{
			"message": "webhook received correctly",
		})
	}
	return fiber.NewError(http.StatusInternalServerError, "error while validating the signature")
}
