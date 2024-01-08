import { UserStatus } from '@prisma/client'
import { serviceGetUserByEmail } from '../../services/user'
import CredentialInvalidException from '../../exceptions/CredentialInvalidException'
import { BaseAuthProvider } from './BaseAuthProvider'
import { getAuth } from 'firebase-admin/auth'
import { mdUserAdd } from '@shared/models'

export default class GoogleAuthProvider extends BaseAuthProvider {
  constructor({ email, password }: { email: string; password: string }) {
    super({ email, password })
  }

  async verify() {
    try {
      let user = await serviceGetUserByEmail(this.email)
      const verifiedUser = await getAuth().verifyIdToken(this.password)

      if (!user) {
        user = await mdUserAdd({
          email: verifiedUser.email,
          password: '1',
          name: verifiedUser.name,
          country: null,
          bio: null,
          dob: null,
          status: UserStatus.ACTIVE,
          photo: verifiedUser.picture,
          settings: {},
          createdAt: new Date(),
          createdBy: null,
          updatedAt: null,
          updatedBy: null
        })
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

}
