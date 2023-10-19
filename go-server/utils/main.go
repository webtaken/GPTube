package utils

import (
	"math"
	"regexp"

	"github.com/forPelevin/gomoji"
	"github.com/gofiber/fiber/v2"
)

func CleanComment(comment string) string {
	// Removing all emojis
	clean := gomoji.RemoveEmojis(comment)
	reg := regexp.MustCompile("[[:punct:]]")
	// removing punctuations
	clean = reg.ReplaceAllString(clean, "")
	return clean
}

func RoundFloat(val float64, precision uint) float64 {
	ratio := math.Pow(10, float64(precision))
	return math.Round(val*ratio) / ratio
}

func HandleError(err error, statusCode int, c *fiber.Ctx) error {
	type errorResponse struct {
		Error string `json:"error" example:"an error ocurred"`
	}
	c.JSON(errorResponse{
		Error: err.Error(),
	})
	return c.SendStatus(statusCode)
}
