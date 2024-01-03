export abstract class BaseAuthProvider {
  protected email: string
  protected password: string
  protected user: {
    id: string
    email: string
    name: string
    photo: string
  }

  constructor({ email, password }: { email: string; password: string }) {
    this.email = email
    this.password = password
  }

  abstract verify(): Promise<void>
  getUser() {
    return this.user
  }
}
