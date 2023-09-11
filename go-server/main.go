package main

import (
	"gptube/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// @title Fiber Example API
// @version 1.0
// @description This is the swagger documentation for API
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email fiber@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:8000
// @BasePath /
func main() {
	app := fiber.New()
	app.Use(cors.New())
	router.SetupRoutes(app)
	app.Listen(":8000")
}
