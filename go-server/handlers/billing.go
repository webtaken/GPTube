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
	"log"
	"math"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/NdoleStudio/lemonsqueezy-go"
	"github.com/gofiber/fiber/v2"
)

const (
	USER_ID_META_TAG                = "user_id"
	SUBSCRIPTION_PLAN_SLUG_META_TAG = "subscription_plan_slug"
)

// @Summary		Get the subscription plans offered by GPTube
// @Description	An endpoint to retrieve the subscription plan offered by GPTube with its price, features, etc.
// @Produce		json
// @Success		200	{array}		models.SubscriptionPlan
// @Failure		500	{object}	fiber.Error
// @Router			/billing/subscription-plans [get]
func BillingSubscriptionPlans(c *fiber.Ctx) error {
	subscriptionPlans, err := database.GetSubscriptionPlans()
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
// @Param			variant_id	query		string	true	"the variant id of the subscription plan"
// @Param			user_id		query		string	true	"the user id"
// @Success		200			{object}	lemonsqueezy.ApiResponse[lemonsqueezy.CheckoutAttributes, lemonsqueezy.ApiResponseRelationshipsDiscount]
// @Failure		400			{object}	fiber.Error
// @Failure		500			{object}	fiber.Error
// @Router			/billing/checkout [get]
func BillingCheckout(c *fiber.Ctx) error {
	variantId := strings.TrimSpace(c.Query("variant_id", ""))
	userId := strings.TrimSpace(c.Query("user_id", ""))

	if variantId == "" {
		return fiber.NewError(http.StatusBadRequest, "please provide a variant id")
	}
	if userId == "" {
		return fiber.NewError(http.StatusBadRequest, "please provide a user id")
	}

	subscriptionPlans, err := database.GetSubscriptionPlans()
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError, "try again later")
	}

	subscriptionPlanSlug := models.FREE
	for _, subscriptionPlan := range subscriptionPlans {
		for _, variant := range subscriptionPlan.Variants {
			if variant == variantId {
				subscriptionPlanSlug = subscriptionPlan.Slug
				break
			}
		}
	}

	checkoutParams := &lemonsqueezy.CheckoutCreateParams{
		StoreID:         services.LemonStoreId,
		VariantID:       variantId,
		ExpiresAt:       time.Now().Add(24 * time.Hour), // expires in 24 hours
		EnabledVariants: make([]int, 0),
		ButtonColor:     "#81F7AC",
		CustomData: map[string]string{
			SUBSCRIPTION_PLAN_SLUG_META_TAG: fmt.Sprint(subscriptionPlanSlug),
			USER_ID_META_TAG:                userId,
		},
	}
	checkout, _, err := services.LemonClient.Checkouts.Create(context.Background(), checkoutParams)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError,
			"Error while trying to get the checkout URL, try again later.")
	}
	return c.Status(http.StatusOK).JSON(checkout)
}

// @Summary		Get the subscribed subscriptions of an account
// @Description	An endpoint to retrieve all the subscriptions belonging to an account
// @Produce		json
// @Param			user_id	query		string	true	"the user id"
// @Success		200		{array}		models.Subscription
// @Failure		400		{object}	fiber.Error
// @Failure		500		{object}	fiber.Error
// @Router			/billing/subscriptions [get]
func BillingSubscriptions(c *fiber.Ctx) error {
	userId := strings.TrimSpace(c.Query("user_id", ""))
	if userId == "" {
		return fiber.NewError(http.StatusBadRequest, "please add a non-empty user_id parameter")
	}
	subscriptions, err := database.GetAllSubscriptions(userId)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError, "could fetch any subscription, try again later")
	}
	return c.Status(http.StatusOK).JSON(subscriptions)
}

// @Summary		Get the latest Invoices from a subscription
// @Description	An endpoint to retrieve the invoices from a user's subscription
// @Produce		json
// @Param			subscription_id	query		string	true	"the subscription id"
// @Param			page			query		int		false	"the queried page"
// @Param			page_size		query		int		false	"page size for the results (default: 10, max: 50)"
// @Success		200				{object}	lemonsqueezy.ApiResponseList[lemonsqueezy.SubscriptionInvoiceAttributes, lemonsqueezy.ApiResponseRelationshipsSubscriptionInvoice]
// @Failure		400				{object}	fiber.Error
// @Failure		500				{object}	fiber.Error
// @Router			/billing/invoices [get]
func BillingSubscriptionInvoices(c *fiber.Ctx) error {
	subscriptionId := strings.TrimSpace(c.Query("subscription_id", ""))
	if subscriptionId == "" {
		return fiber.NewError(http.StatusBadRequest, "please provide a subscription id")
	}

	page, err := strconv.Atoi(c.Query("page", fmt.Sprintf("%d", config.DEFAULT_PAGE_NUM)))
	if err != nil {
		return fiber.NewError(http.StatusBadRequest, "please provide a valid page number")
	}
	if page < config.MIN_PAGE_NUM {
		return fiber.NewError(http.StatusBadRequest, "page number can not be zero or negative")
	}

	pageSize, err := strconv.Atoi(c.Query("page_size", fmt.Sprintf("%d", config.DEFAULT_PAGE_SIZE)))

	if err != nil {
		return fiber.NewError(http.StatusBadRequest, "please provide a valid page size number")
	}
	if pageSize < config.MIN_PAGE_SIZE {
		return fiber.NewError(http.StatusBadRequest, "page size number can not be zero or negative")
	}
	// Ensuring the max page size
	pageSize = int(math.Min(float64(pageSize), config.MAX_PAGE_SIZE))

	var invoices lemonsqueezy.SubscriptionInvoicesApiResponse
	agent := fiber.AcquireAgent()
	agent.ContentType("application/json")
	agent.Set("Authorization", services.LemonSqueezyAuthHeader)
	req := agent.Request()
	req.Header.SetMethod(fiber.MethodGet)
	req.SetRequestURI(fmt.Sprintf("%s/subscription-invoices", config.Config("LEMON_SQUEEZY_API_URL")))
	agent.QueryString(
		fmt.Sprintf("filter[subscription_id]=%v&page[number]=%v&page[size]=%v",
			subscriptionId, page, pageSize),
	)

	if err := agent.Parse(); err != nil {
		return fiber.NewError(http.StatusInternalServerError, "couldn't fetch the the invoices please try again later")
	}

	statusCode, _, errs := agent.Struct(&invoices)
	if statusCode != http.StatusOK && len(errs) > 0 {
		return fiber.NewError(http.StatusInternalServerError, "couldn't fetch the the invoices please try again later")
	}

	return c.Status(http.StatusOK).JSON(invoices)
}

// @Summary		Get the update payment method URL for a subscription
// @Description	An endpoint to retrieve the URL to update the payment method for a subscription
// @Produce		json
// @Param			subscription_id	query		string	true	"the subscription id"
// @Success		200				{object}	lemonsqueezy.ApiResponse[lemonsqueezy.Subscription, lemonsqueezy.ApiResponseRelationshipsSubscription]
// @Failure		400				{object}	fiber.Error
// @Failure		500				{object}	fiber.Error
// @Router			/billing/update-payment-method [get]
func BillingUpdatePaymentMethod(c *fiber.Ctx) error {
	subscriptionId := strings.TrimSpace(c.Query("subscription_id", ""))
	if subscriptionId == "" {
		return fiber.NewError(http.StatusBadRequest, "please add a non-empty 'subscription_id' query param")
	}
	subscription, _, err := services.LemonClient.Subscriptions.Get(context.Background(), subscriptionId)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError,
			"an error while trying to retrieve the URL. Check the subscription_id exists")
	}
	return c.Status(http.StatusOK).JSON(subscription)
}

// @Summary		Cancel a subscription
// @Description	An endpoint to cancel a subscription
// @Produce		json
// @Param			subscription_id	query		string	true	"the subscription id"
// @Success		200				{string}	string	"OK"
// @Failure		400				{object}	fiber.Error
// @Failure		500				{object}	fiber.Error
// @Router			/billing/cancel-subscription [get]
func BillingCancelSubscription(c *fiber.Ctx) error {
	subscriptionId := strings.TrimSpace(c.Query("subscription_id", ""))
	if subscriptionId == "" {
		return fiber.NewError(http.StatusBadRequest, "please add the 'subscription_id' query param")
	}
	_, _, err := services.LemonClient.Subscriptions.Cancel(context.Background(), subscriptionId)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError, "could not cancel the subscription, try again later")
	}
	return c.Status(http.StatusOK).SendString("OK")
}

// @Summary		Resume a subscription
// @Description	An endpoint to resume a cancelled subscription
// @Produce		json
// @Param			subscription_id	query		string	true	"the subscription id"
// @Success		200				{string}	string	"OK"
// @Failure		400				{object}	fiber.Error
// @Failure		500				{object}	fiber.Error
// @Router			/billing/resume-subscription [get]
func BillingResumeSubscription(c *fiber.Ctx) error {
	subscriptionId := strings.TrimSpace(c.Query("subscription_id", ""))
	if subscriptionId == "" {
		return fiber.NewError(http.StatusBadRequest, "please add the 'subscription_id' query param")
	}
	subscriptionParams := &lemonsqueezy.SubscriptionUpdateParams{
		ID: subscriptionId,
		Attributes: lemonsqueezy.SubscriptionUpdateParamsAttributes{
			Cancelled: false,
		},
	}
	_, _, err := services.LemonClient.Subscriptions.Update(context.Background(), subscriptionParams)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError, "an error ocurred while resuming your subscription, try again later")
	}
	return c.Status(http.StatusOK).SendString("OK")
}

func billingCreateSubscriptionWebhookHandler(
	subscription *lemonsqueezy.WebhookRequest[
		lemonsqueezy.Subscription,
		lemonsqueezy.ApiResponseRelationshipsSubscription,
	],
) error {
	subscriptionPlanSlugMeta := subscription.Meta.CustomData[SUBSCRIPTION_PLAN_SLUG_META_TAG]
	userId := subscription.Meta.CustomData[USER_ID_META_TAG].(string)
	if subscriptionPlanSlugMeta == nil {
		subscriptionPlanSlugMeta = fmt.Sprint(models.FREE) // by default free plan
	}
	subscriptionPlanSlug, err := strconv.Atoi(subscriptionPlanSlugMeta.(string))
	if err != nil {
		return err
	}

	newSubscription := models.Subscription{
		SubscriptionId:       subscription.Data.ID,
		SubscriptionPlanSlug: models.SubscriptionPlanSlug(subscriptionPlanSlug),
		UserEmail:            subscription.Data.Attributes.UserEmail,
		OrderId:              subscription.Data.Attributes.OrderID,
		ProductId:            subscription.Data.Attributes.ProductID,
		VariantId:            subscription.Data.Attributes.VariantID,
		CustomerId:           subscription.Data.Attributes.CustomerID,
		ProductName:          subscription.Data.Attributes.ProductName,
		Status:               subscription.Data.Attributes.Status,
		StatusFormatted:      subscription.Data.Attributes.StatusFormatted,
		TrialEndsAt:          subscription.Data.Attributes.TrialEndsAt,
		RenewsAt:             subscription.Data.Attributes.RenewsAt,
		EndsAt:               subscription.Data.Attributes.EndsAt,
		CreatedAt:            subscription.Data.Attributes.CreatedAt,
		UpdatedAt:            subscription.Data.Attributes.UpdatedAt,
		CardBrand:            subscription.Data.Attributes.CardBrand,
		CardLastFour:         subscription.Data.Attributes.CardLastFour,
		UpdatePaymentMethod:  subscription.Data.Attributes.Urls.UpdatePaymentMethod,
	}

	fmt.Printf("[billingCreateSubscriptionWebhookHandler] creating subscription %s for user with Id %s\n",
		subscription.Data.ID, userId)

	err = database.CreateSubscription(userId, &newSubscription)
	return err
}

func billingUpdateSubscriptionWebhookHandler(
	subscription *lemonsqueezy.WebhookRequest[
		lemonsqueezy.Subscription,
		lemonsqueezy.ApiResponseRelationshipsSubscription,
	],
) error {
	subscriptionPlanSlugMeta := subscription.Meta.CustomData[SUBSCRIPTION_PLAN_SLUG_META_TAG]
	userId := subscription.Meta.CustomData[USER_ID_META_TAG].(string)
	if subscriptionPlanSlugMeta == nil {
		subscriptionPlanSlugMeta = fmt.Sprint(models.FREE) // by default free plan
	}
	subscriptionPlanSlug, err := strconv.Atoi(subscriptionPlanSlugMeta.(string))
	if err != nil {
		return err
	}

	updatedSubscription := models.Subscription{
		SubscriptionId:       subscription.Data.ID,
		SubscriptionPlanSlug: models.SubscriptionPlanSlug(subscriptionPlanSlug),
		UserEmail:            subscription.Data.Attributes.UserEmail,
		OrderId:              subscription.Data.Attributes.OrderID,
		ProductId:            subscription.Data.Attributes.ProductID,
		VariantId:            subscription.Data.Attributes.VariantID,
		CustomerId:           subscription.Data.Attributes.CustomerID,
		ProductName:          subscription.Data.Attributes.ProductName,
		Status:               subscription.Data.Attributes.Status,
		StatusFormatted:      subscription.Data.Attributes.StatusFormatted,
		TrialEndsAt:          subscription.Data.Attributes.TrialEndsAt,
		RenewsAt:             subscription.Data.Attributes.RenewsAt,
		EndsAt:               subscription.Data.Attributes.EndsAt,
		CreatedAt:            subscription.Data.Attributes.CreatedAt,
		UpdatedAt:            subscription.Data.Attributes.UpdatedAt,
		CardBrand:            subscription.Data.Attributes.CardBrand,
		CardLastFour:         subscription.Data.Attributes.CardLastFour,
		UpdatePaymentMethod:  subscription.Data.Attributes.Urls.UpdatePaymentMethod,
	}

	fmt.Printf("[billingUpdateSubscriptionWebhookHandler] updating subscription %s for user with id %s\n",
		subscription.Data.ID, userId)
	err = database.UpdateSubscription(userId, &updatedSubscription)
	return err
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
			fmt.Printf("%s\n", webhookBody.Meta.EventName)
			return c.Status(http.StatusOK).JSON(fiber.Map{
				"message": fmt.Sprintf("webhook for event %s handled", webhookBody.Meta.EventName),
			})
		}

		if config.Config("ENV_MODE") == config.ENV_DEVELOPMENT {
			log.Printf("[BillingSubscriptionsWebhooks]\npayload body: %s\n", string(prettyJSON))
		}
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
