package handlers

import (
	"github.com/gofiber/fiber/v2"
)

type helloApiMessage struct {
	Message string `json:"message"`
}

//	@Summary		Hello message from the api
//	@Description	An endpoint used to test the api stability
//	@Produce		json
//	@Success		200	{object}	helloApiMessage
//	@Router			/api [get]
func ApiHandler(c *fiber.Ctx) error {
	return c.JSON(helloApiMessage{
		Message: "GPTube main api",
	})
}

//	@Summary		Hello message from the billing api
//	@Description	An endpoint used to test the billing api stability
//	@Produce		json
//	@Success		200	{object}	helloApiMessage
//	@Router			/billing [get]
func BillingHandler(c *fiber.Ctx) error {
	return c.JSON(helloApiMessage{
		Message: "GPTube billing api",
	})
}
