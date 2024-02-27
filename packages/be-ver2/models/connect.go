package models

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var dbClient *mongo.Client

func ConnectDatabase() {
	uri := os.Getenv("MONGODB_URL")

	if uri == "" {
		log.Fatal(
			"You must set your 'MONGODB_URL' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable",
		)
	}

	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Println(err)
		return
	}

	dbClient = client

	// Ping the MongoDB server to ensure connectivity
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Println("Ping mongodb error", err)
		return
	}

	log.Println("Mongodb connection established !")

}

func CloseDatabase() {

}
