package libs

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var ACCESS_KEY = os.Getenv("JWT_SECRET_KEY")
var REFRESH_KEY = os.Getenv("JWT_REFRESH_KEY")
var ACCESS_EXPIRED = os.Getenv("JWT_TOKEN_EXPIRED")
var REFRESH_EXPIRED = os.Getenv("JWT_REFRESH_EXPIRED")

type UserClaim struct {
	jwt.MapClaims
	id    string
	email string
	name  string
	photo string
}

func GenAccessToken(id string, email string, name string, photo string) (string, error) {

	// min, err := strconv.Atoi(ACCESS_EXPIRED)
	//
	// if err != nil {
	// 	log.Println("convert access expired to number error: ", err)
	// 	return "", err
	// }
	//
	// log.Println("expired time is: ", min)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    id,
		"name":  name,
		"email": email,
		"photo": photo,
		"iat":   time.Now().Unix(),
		"exp":   time.Now().Add(time.Minute * time.Duration(30)).Unix(),
	})

	return _createJwtSignedString("ACCESS_KEY", token)

}

func GenRefreshToken(email string) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"iat":   time.Now().Unix(),
		"exp":   time.Now().Add(time.Hour * time.Duration(4)).Unix(),
	})

	return _createJwtSignedString("REFRESH_KEY", token)

}

func _createJwtSignedString(t string, token *jwt.Token) (string, error) {
	var key []byte

	switch t {
	case "ACCESS_KEY":
		log.Println("access_key", ACCESS_KEY)
		key = []byte(ACCESS_KEY)
	case "REFRESH_KEY":
		log.Println("access_key", REFRESH_KEY)
		key = []byte(REFRESH_KEY)
	}

	tokenString, err := token.SignedString(key)

	if err != nil {
		return "", err
	}

	return tokenString, nil

}

func ParseToken(tokenType string, token string) (jwt.MapClaims, error) {

	// parse token to get jwt token
	jwtToken, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if tokenType == "ACCESS_KEY" {
			log.Println("access key", ACCESS_KEY)
			return []byte(ACCESS_KEY), nil
		}

		log.Println("refresh key", REFRESH_KEY)
		return []byte(REFRESH_KEY), nil
	})

	// err returned as token is invalid or expired
	if err != nil {
		log.Println("Error:", err)
		return nil, err
	}

	// extract data inside token
	claims := jwtToken.Claims.(jwt.MapClaims)
	// expTime, err := claims.GetExpirationTime()

	if err != nil {
		return nil, err
	}

	// checking expiration time is unnecessary

	// // check expiration time
	// now := time.Now().Unix()
	// exp := expTime.Unix()
	//
	// log.Println(now, exp, now > exp)
	//
	// if now > exp {
	// 	return nil, errors.New("Token expired")
	// }

	// output claims for verification
	log.Println("================================================")

	return claims, nil

}
