package profileController

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Get(c *gin.Context) {

	user, exist := c.Get("user")
	uid := c.Params.ByName("uid")

	log.Println("user id after authentication", uid)

	if exist == false {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	log.Println(user)

	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
	})
}
