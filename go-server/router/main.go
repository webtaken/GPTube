package router

import (
	"gptube/handlers"

	"github.com/gofiber/swagger"

	_ "gptube/docs"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/swagger/*", swagger.HandlerDefault)

	billing := app.Group("/billing")
	// documented
	billing.Get("", handlers.BillingHandler)
	// documented
	billing.Get("/subscription-plans", handlers.BillingSubscriptionPlans)
	// documented
	billing.Get("/checkout", handlers.BillingCheckout)
	billing.Post("/invoices", handlers.BillingSubscriptionInvoices)
	billing.Get("/subscriptions", handlers.BillingSubscriptions)
	billing.Get("/update-payment-method", handlers.BillingUpdatePaymentMethod)
	billing.Get("/cancel-subscription", handlers.BillingCancelSubscription)
	billing.Get("/resume-subscription", handlers.BillingResumeSubscription)
	// This is a special endpoint for receiving subscriptions webhooks on LemonSqueezy
	billing.Post("/webhooks", handlers.BillingSubscriptionsWebhooks)

	api := app.Group("/api")
	api.Get("", handlers.ApiHandler)
	// documented
	youtubeRoutes := api.Group("/youtube")
	// documented
	youtubeRoutes.Get("/videos", handlers.YoutubeListVideosHandler)
	// documented
	youtubeRoutes.Get("/videos/:videoId", handlers.YoutubeGetVideoHandler)
	// documented
	youtubeRoutes.Get("/videos/:videoId/negative-comments",
		handlers.YoutubeGetNegativeCommentsHandler)
	// documented
	youtubeRoutes.Post("/pre-analysis", handlers.YoutubePreAnalysisHandler)
	// documented
	youtubeRoutes.Post("/analysis-landing", handlers.YoutubeAnalysisLandingHandler)
	// documented
	youtubeRoutes.Post("/analysis", handlers.YoutubeAnalysisHandler)

}
