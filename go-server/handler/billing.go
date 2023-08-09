package handler

import (
	"fmt"
	"gptube/models"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func BillingSubscriptionInvoices(c *fiber.Ctx) error {
	var body models.InvoicesRequest
	if err := c.BodyParser(&body); err != nil {
		c.JSON(fiber.Map{
			"error": fmt.Errorf("%v", err).Error(),
		})
		return c.SendStatus(http.StatusInternalServerError)
	}
	fmt.Println(body.SubscriptionId, body.Page, body.PageSize)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}
