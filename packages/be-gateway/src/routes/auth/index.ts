import { User, UserStatus } from '@prisma/client'
import { Router } from 'express'
import { validateRegisterUser } from '@shared/validation'
import { mdUserAdd, mdUserFindEmail } from '@shared/models'
import { compareHashPassword, hashPassword } from '../../lib/password'
import { generateRefreshToken, generateToken } from '../../lib/jwt'

const router = Router()

router.post('/auth/sign-in', async (req, res) => {
  try {
    const body = req.body as Pick<User, 'email' | 'password'>
    console.log('/auth/sign-in =============')
    console.time('getUser')
    const user = await mdUserFindEmail(body.email)
    console.timeEnd('getUser')

    if (!user) {
      return res.json({ status: 400, error: 'Your credential is invalid' })
    }

    console.time('compare-pwd')
    const result = compareHashPassword(body.password, user.password)
    console.timeEnd('compare-pwd')
    if (!result) {
      return res.json({
        status: 400,
        error: 'Your email or password is invalid'
      })
    }

    console.time('gen-token')
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      photo: user.photo
    })
    console.timeEnd('gen-token')

    console.time('gen-refresh-token')
    const refreshToken = generateRefreshToken({
      email: user.email
    })
    console.timeEnd('gen-refresh-token')

    res.setHeader('Authorization', token)
    res.setHeader('RefreshToken', refreshToken)

    res.json({ status: 200, data: user })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.post('/auth/sign-up', async (req, res) => {
  try {
    const body = req.body as User
    const { error, errorArr, data } = validateRegisterUser(body)

    if (error && errorArr) {
      return res.json({ status: 404, error: errorArr })
    }

    const resultData = data as User
    const hashedPwd = hashPassword(resultData.password)

    console.log(1)
    const user = await mdUserAdd({
      email: resultData.email,
      password: hashedPwd,
      name: resultData.name,
      country: null,
      bio: null,
      dob: null,
      status: UserStatus.ACTIVE,
      photo: null,
      settings: {},
      createdAt: new Date(),
      createdBy: null,
      updatedAt: null,
      updatedBy: null
    })

    res.json({
      status: 200,
      data: user
    })
  } catch (error) {
    res.json({
      status: 500,
      error
    })
  }
})

export default router
