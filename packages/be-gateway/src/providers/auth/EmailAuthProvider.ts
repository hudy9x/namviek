import { UserStatus } from '@prisma/client'
import { serviceGetUserByEmail } from '../../services/user'
import { compareHashPassword } from '../../lib/password'
import CredentialInvalidException from '../../exceptions/CredentialInvalidException'
import InactiveAccountException from '../../exceptions/InactiveAccountException'
import { BaseAuthProvider } from './BaseAuthProvider'

export default class EmailAuthProvider extends BaseAuthProvider {
  constructor({ email, password }: { email: string; password: string }) {
    super({ email, password })
  }

  async verify() {
    const user = await serviceGetUserByEmail(this.email)

    if (!user) {
      throw new CredentialInvalidException()
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new InactiveAccountException()
    }

    const result = compareHashPassword(this.password, user.password)

    if (!result) {
      throw new CredentialInvalidException()
    }

    this.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      photo: user.photo
    }
  }

}
