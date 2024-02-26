package authController

import (
	"namviek-backend/packages/be-ver2/libs"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GenJwtNRefresh(c *gin.Context) {

	accessToken, err := libs.GenAccessToken(
		"123123",
		"email@email.com",
		"admin",
		"http://image.com",
	)

	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	refreshToken, err := libs.GenRefreshToken("email@email.com")

	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":       "ok",
		"access_token":  accessToken,
		"refresh_token": refreshToken,
	})
}
