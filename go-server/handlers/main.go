package handlers

import (
	"github.com/gofiber/fiber/v2"
)

type helloApiMessage struct {
	Message string `json:"message"`
}

// @Summary		Hello from the api
// @Description	get base api welcome response
// @Produce		json
// @Success		200	{object}	helloApiMessage
// @Router			/api/ [get]
func ApiHandler(c *fiber.Ctx) error {
	return c.JSON(helloApiMessage{
		Message: "GPTube main api",
	})
}

func BillingHandler(c *fiber.Ctx) error {
	return c.JSON(helloApiMessage{
		Message: "GPTube billing api",
	})
}
