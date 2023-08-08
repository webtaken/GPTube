package router

import (
	"gptube/handler"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("", handler.HomeHandler)

	youtubeRoutes := api.Group("/youtube")
	youtubeRoutes.Post("/pre-analysis", handler.YoutubePreAnalysisHandler)
	youtubeRoutes.Post("/analysis", handler.YoutubeAnalysisHandler)
}
