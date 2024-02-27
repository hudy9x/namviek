package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const EUserStatusActive = "ACTIVE"
const EUserStatusInactive = "INACTIVE"

type User struct {
	id        primitive.ObjectID `bson:"_id`
	email     string
	password  string
	name      string
	status    string
	country   string
	bio       string
	photo     string
	dob       time.Time
	settings  interface{}
	createdAt time.Time
	createdBy string
	updatedAt time.Time
	updatedBy string
}
