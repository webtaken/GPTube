package handlers

import (
	"github.com/gofiber/fiber/v2"
)

func ApiHandler(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "GPTube api",
	})
}

func BillingHandler(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "GPTube billing",
	})
}
