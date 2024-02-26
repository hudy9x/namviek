package middlewares

import (
	"log"
	"namviek-backend/packages/be-ver2/libs"
	"net/http"

	"github.com/gin-gonic/gin"
)

func VerifyAuth(c *gin.Context) {
	var token = c.GetHeader("authorization")
	// var refreshToken = c.GetHeader("refreshtoken")

	claims, err := libs.ParseToken("ACCESS_KEY", token)

	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// claimsRefresh, err := libs.ParseToken("", refreshToken)

	log.Println(claims["email"], claims["photo"], claims["id"])

	c.Set("user", claims)
	c.Next()
}
