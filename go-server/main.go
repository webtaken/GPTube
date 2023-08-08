package main

import (
	"gptube/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	router.SetupRoutes(app)
	app.Listen(":8000")
}
