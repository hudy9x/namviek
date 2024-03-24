package profileController

import (
	"log"
	"net/http"

	"namviek-backend/packages/be-ver2/daos"

	"github.com/gin-gonic/gin"
)

func Get(c *gin.Context) {
	user, exist := c.Get("user")
	// uid := c.Params.ByName("uid")

	// log.Println("user id after authentication", uid)
	log.Println("user data:", user)

	if exist == false {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	log.Println(user)

	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
	})
}

type Profile struct {
	daos.UserImpl
	Name        string `json:"name"`
	Location    string `json:"location"`
	Bio         string `json:"bio"`
	Password    string `json:"password"`
	NewPassword string `json:"newPassword"`
	Uid         string `json:"uid"`
}

func Post(c *gin.Context) {
	var profile Profile
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.Error(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if profile.Password == "" { // check password valid
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	profile.Update()

	log.Printf("user profile: %v", profile)
	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
	})
}
