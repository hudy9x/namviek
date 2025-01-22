export default class CredentialInvalidException extends Error {
  status: number
  constructor(message?: string) {
    super(message || 'Invalid credential or inactive email')
    this.status = 400
  }
}
