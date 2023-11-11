package main

import (
	"fmt"
	"gptube/config"
	"gptube/handlers"
	"gptube/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

// Important!!! forget to add things like: example("param example") after a Param API definition
// Generation of the typescript api code won't work if you do that

// @title			GPTube API swagger docs
// @version		1.0
// @description	This is the API documentation of GPTube
// @termsOfService	http://swagger.io/terms/
// @contact.name	saul rojas coila
// @contact.email	luckly083@gmail.com
// @license.name	Apache 2.0
// @license.url	http://www.apache.org/licenses/LICENSE-2.0.html
// @host			localhost:8001
// @BasePath
func main() {
	app := fiber.New(fiber.Config{
		ErrorHandler: handlers.CustomErrorHandler,
	})
	app.Use(recover.New(recover.Config{
		EnableStackTrace: true,
	}))
	app.Use(cors.New())
	router.SetupRoutes(app)
	appPort := config.Config("PORT")
	app.Listen(fmt.Sprintf(":%s", appPort))
}
