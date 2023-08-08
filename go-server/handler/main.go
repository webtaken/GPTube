package handler

import (
	"github.com/gofiber/fiber/v2"
)

func HomeHandler(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "GPTube api",
	})
}
