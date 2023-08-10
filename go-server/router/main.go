package router

import (
	"gptube/handler"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	billing := app.Group("/billing")
	billing.Get("", handler.BillingHandler)
	billing.Get("/checkout", handler.BillingCheckout)
	billing.Post("/invoices", handler.BillingSubscriptionInvoices)

	api := app.Group("/api")
	api.Get("", handler.ApiHandler)
	youtubeRoutes := api.Group("/youtube")
	youtubeRoutes.Post("/pre-analysis", handler.YoutubePreAnalysisHandler)
	youtubeRoutes.Post("/analysis", handler.YoutubeAnalysisHandler)
}
