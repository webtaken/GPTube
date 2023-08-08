package utils

import (
	"math"
	"regexp"

	"github.com/forPelevin/gomoji"
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
