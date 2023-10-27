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
	billing.Get("", handlers.BillingHandler)
	billing.Get("/products", handlers.BillingProducts)
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
	youtubeRoutes := api.Group("/youtube")
	// documented
	youtubeRoutes.Get("/videos", handlers.YoutubeVideosHandler)
	// documented
	youtubeRoutes.Post("/pre-analysis", handlers.YoutubePreAnalysisHandler)
	// documented
	youtubeRoutes.Post("/analysis-landing", handlers.YoutubeAnalysisLandingHandler)
	// documented
	youtubeRoutes.Post("/analysis", handlers.YoutubeAnalysisHandler)

}
