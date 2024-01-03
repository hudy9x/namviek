import { User, UserStatus } from '@prisma/client'
import { serviceGetUserByEmail } from '../../services/user'
import { compareHashPassword } from '../../lib/password'
import CredentialInvalidException from '../../exceptions/CredentialInvalidException'
import InactiveAccountException from '../../exceptions/InactiveAccountException'
import { BaseAuthProvider } from './BaseAuthProvider'
import { getAuth } from 'firebase-admin/auth'

export default class GoogleAuthProvider extends BaseAuthProvider {
  // private email: string
  // private password: string
  // private user: {
  //   id: string
  //   email: string
  //   name: string
  //   photo: string
  // }
  constructor({ email, password }: { email: string; password: string }) {
    super({ email, password })
    // this.email = email
    //
    // this.password = password
  }

  async verify() {
    try {
      const user = await serviceGetUserByEmail(this.email)
      const verifiedIDToken = await getAuth().verifyIdToken(this.password)

      if (!user) {
        throw new CredentialInvalidException()
        // return { status: 400, error: 'Your credential is invalid' }
      }

      if (user.status === UserStatus.INACTIVE) {
        throw new InactiveAccountException()
        // return { status: 403, error: 'inactive email' }
      }

      const result = compareHashPassword(this.password, user.password)

      if (!result) {
        throw new CredentialInvalidException()
        // return {
        //   status: 400,
        //   error: 'Your email or password is invalid'
        // }
      }

      this.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        photo: user.photo
      }
    } catch (error) {
      throw new CredentialInvalidException()
    }
  }

  // getUser() {
  //   return this.user
  // }
}
