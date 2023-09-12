package router

import (
	"gptube/handlers"

	"github.com/gofiber/swagger"

	_ "gptube/docs"

	"github.com/gofiber/fiber/v2"
)

// @title GPTube API swagger docs
// @version 1.0
// @description This is the API documentation of GPTube
// @termsOfService http://swagger.io/terms/
// @contact.name saul rojas coila
// @contact.email luckly083@gmail.com
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:8000
// @BasePath /api
func SetupRoutes(app *fiber.App) {
	app.Get("/swagger/*", swagger.HandlerDefault)

	// app.Get("/swagger/*", swagger.New(swagger.Config{ // custom
	// 	URL:         "swagger.json",
	// 	DeepLinking: false,
	// 	// Expand ("list") or Collapse ("none") tag groups by default
	// 	DocExpansion: "none",
	// }))

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
	youtubeRoutes.Post("/pre-analysis", handlers.YoutubePreAnalysisHandler)
	youtubeRoutes.Post("/analysis", handlers.YoutubeAnalysisHandler)

}
