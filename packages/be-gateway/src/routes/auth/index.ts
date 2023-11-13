import { User, UserStatus } from '@prisma/client'
import { mdUserAdd, mdUserFindEmail, mdUserUpdate } from '@shared/models'
import { validateRegisterUser } from '@shared/validation'
import { Router } from 'express'
import { sendVerifyEmail } from '../../lib/email'
import {
  decodeToken,
  generateRefreshToken,
  generateToken,
  generateVerifyToken
} from '../../lib/jwt'
import { compareHashPassword, hashPassword } from '../../lib/password'
import { JWTPayload } from '../../types'
import { serviceGetUserByEmail, serviceGetUserById } from '../../services/user'

const mainRouter = Router()
const router = Router()

mainRouter.use('/auth', router)

router.post('/refresh-token', async (req, res) => {
  console.log('a')
})

router.post('/sign-in', async (req, res) => {
  try {
    const body = req.body as Pick<User, 'email' | 'password'>
    console.log('/auth/sign-in =============')
    console.time('getUser')
    const user = await serviceGetUserByEmail(body.email)
    // const user = await mdUserFindEmail(body.email)
    console.timeEnd('getUser')

    if (!user) {
      return res.json({ status: 400, error: 'Your credential is invalid' })
    }

    if (user.status === UserStatus.INACTIVE) {
      return res.status(403).send()
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

router.post('/sign-up', async (req, res) => {
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
      status: UserStatus.INACTIVE,
      photo: null,
      settings: {},
      createdAt: new Date(),
      createdBy: null,
      updatedAt: null,
      updatedBy: null
    })

    const token = generateVerifyToken({
      email: resultData.email,
      name: resultData.name
    })

    await sendVerifyEmail({
      userName: resultData.name,
      email: resultData.email,
      token: token
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

router.get('/verify', async (req, res) => {
  const { token } = req.query as { token: string }
  try {
    const { email } = decodeToken(token) as JWTPayload
    const user = await mdUserFindEmail(email)
    if (!user) {
      return res.json({ status: 400, error: 'Your credential is invalid' })
    }

    if (user.status === UserStatus.ACTIVE) {
      res.json({
        status: 200,
        message: 'Your account has already been activated'
      })
    } else {
      await mdUserUpdate(user.id, { status: UserStatus.ACTIVE })
      res.json({
        status: 200,
        message: 'Congratulations! Your Account is Now Active.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.post('/resend-verify-email', async (req, res) => {
  try {
    const { email } = req.body

    const user = await mdUserFindEmail(email)
    if (!user) {
      return res.json({ status: 400, error: 'Your credential is invalid' })
    }

    const token = generateVerifyToken({
      email: email,
      name: user.name
    })

    await sendVerifyEmail({ userName: user.name, email: email, token: token })

    res.json({ status: 200, data: user })
  } catch (error) {
    res.json({
      status: 500,
      error
    })
  }
})

export default mainRouter
