package middlewares

import (
	"log"
	"namviek-backend/packages/be-ver2/libs"
	"net/http"

	"github.com/gin-gonic/gin"
)

func genAccessNRefreshToken() (string, string, error) {

	accessToken, err := libs.GenAccessToken(
		"123123",
		"email@email.com",
		"admin",
		"http://image.com",
	)

	if err != nil {
		return "", "", err
	}

	refreshToken, err := libs.GenRefreshToken("email@email.com")

	if err != nil {

		return "", "", err
	}

	return accessToken, refreshToken, nil
}

type UserCred struct {
	id    string
	name  string
	photo string
	email string
}

func VerifyAuth(c *gin.Context) {
	var token = c.GetHeader("authorization")
	var refreshToken = c.GetHeader("refreshtoken")

	if token == "" || refreshToken == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	log.Println("========================================")
	log.Println("========================================")
	log.Println("========================================")
	log.Println("========================================")

	var userCred UserCred
	log.Println("parsing access key")
	claims, err := libs.ParseToken("ACCESS_KEY", token)

	// access token invalid or expired
	if err != nil {

		log.Println("parsing refresh key")
		_, err := libs.ParseToken("REFRESH_KEY", refreshToken)

		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		newAccessToken, newRefreshToken, err := genAccessNRefreshToken()

		if err != nil {
			log.Println("generate new access token and refresh token error:", err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.Header("authorization", newAccessToken)
		c.Header("refreshtoken", newRefreshToken)

		userCred.email = "email@email.com"
		userCred.name = "admin"
		userCred.photo = "http://image.com"
		userCred.id = "102938192837"

		// set `user` to context, not to HTTP headers
		// now, the next request will be recieved it by c.Get("user")
		c.Set("user", userCred)
		c.Next()
		return

	}

	userCred.id = claims["id"].(string)
	userCred.name = claims["name"].(string)
	userCred.photo = claims["photo"].(string)
	userCred.email = claims["email"].(string)

	// set `user` to context, not to HTTP headers
	// now, the next request will be recieved it by c.Get("user")
	c.Set("user", userCred)
	c.Next()
}
