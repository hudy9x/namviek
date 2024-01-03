import { User, UserStatus } from '@prisma/client'
import { mdUserAdd, mdUserFindEmail, mdUserUpdate } from '@shared/models'
import { validateRegisterUser } from '@shared/validation'
import { Router } from 'express'
import { sendVerifyEmail } from '../../lib/email'
import {
  decodeToken,
  generateVerifyToken
} from '../../lib/jwt'
import { hashPassword } from '../../lib/password'
import { JWTPayload } from '../../types'
import JwtProvider from '../../providers/JwtProvider'
import EmailAuthProvider from '../../providers/auth/EmailAuthProvider'
import CredentialInvalidException from '../../exceptions/CredentialInvalidException'
import GoogleAuthProvider from '../../providers/auth/GoogleAuthProvider'

const mainRouter = Router()
const router = Router()

mainRouter.use('/auth', router)

router.post('/refresh-token', async (req, res) => {
  console.log('a')
})

router.post('/sign-in', async (req, res) => {
  try {
    const body = req.body as Pick<User, 'email' | 'password'> & {
      provider: 'GOOGLE' | 'EMAIL_PASSWORD'
    }

    const isEmailPasswordProvider = body.provider === 'EMAIL_PASSWORD'
    const isGoogleProvider = body.provider === 'GOOGLE'

    let authProvider: EmailAuthProvider | GoogleAuthProvider

    if (isEmailPasswordProvider) {
      authProvider = new EmailAuthProvider({
        email: body.email,
        password: body.password
      })
    }

    if (isGoogleProvider) {
      authProvider = new GoogleAuthProvider({
        email: body.email,
        password: body.password
      })
    }

    if (!authProvider) {
      throw new CredentialInvalidException()
    }

    await authProvider.verify()
    const user = authProvider.getUser()

    const jwtProvider = new JwtProvider({
      id: user.id,
      email: user.email,
      name: user.name,
      photo: user.photo
    })

    const { token, refreshToken } = jwtProvider.generate()

    res.setHeader('Authorization', token)
    res.setHeader('RefreshToken', refreshToken)

    res.json({ status: 200, data: user })
  } catch (error) {
    res.json({ status: error.status, error })
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
