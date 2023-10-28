package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

const (
	DEFAULT_PAGE_NUM  = 1
	MIN_PAGE_NUM      = 1
	DEFAULT_PAGE_SIZE = 10
	MIN_PAGE_SIZE     = 1
	MAX_PAGE_SIZE     = 50
)

// use godot package to load/read the .env file and
// return the value of the key
func Config(key string) string {
	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Printf("Error loading env file: %s", err.Error())
	}
	val, ok := os.LookupEnv(key)
	if !ok {
		log.Printf("Error loading env var %q", key)
	}
	return val
}
