import { generateRefreshToken, generateToken } from '../lib/jwt'

interface JwtEncodeData {
  id: string
  email: string
  name: string
  photo: string
}

export default class JwtProvider {
  private data: JwtEncodeData
  constructor(data: JwtEncodeData) {
    this.data = data
  }

  generate() {
    console.time('gen-token')
    const token = generateToken(this.data)
    console.timeEnd('gen-token')

    console.time('gen-refresh-token')
    const refreshToken = generateRefreshToken({
      email: this.data.email
    })

    console.timeEnd('gen-refresh-token')
    return {
      token,
      refreshToken
    }
  }
}
