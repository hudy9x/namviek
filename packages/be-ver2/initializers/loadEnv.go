package initializers

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnvVars() {
	env := os.Getenv("ENV")
	if env == "" {
		env = ".local"
	}

	log.Println(env)

	err := godotenv.Load(".env" + env)

	if err != nil {
		log.Fatal("Error loading .env file haha")
	}

	log.Println(".env file has been loaded")

}
