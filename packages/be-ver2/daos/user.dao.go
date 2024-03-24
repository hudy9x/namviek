package daos

import "namviek-backend/packages/be-ver2/models"

type UserDao interface {
	Create(u *models.User) error
	Get() error
}

type UserImpl struct{}

func (user UserImpl) Create(u *models.User) error {
	return nil
}

func (user UserImpl) Get() error {
	return nil
}

func (user UserImpl) Update() error {
	return nil
}

func Test() {
	var userDao UserDao
	userDao = UserImpl{}

	u := models.User{}

	userDao.Create(&u)
	userDao.Get() // if interface not defined => this will throw an error
}
