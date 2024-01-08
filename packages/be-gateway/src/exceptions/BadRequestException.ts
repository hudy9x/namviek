export default class BadRequestException extends Error {
  status: number
  constructor(message?: string) {
    super(message || 'BAD_REQUEST')
    this.status = 500
  }
}
