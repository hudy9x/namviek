export default class InactiveAccountException extends Error {
  status: number
  constructor(message?: string) {
    super(message || 'inactive account')
    this.status = 403
  }
}
