export default class ApiNotFoundException extends Error {
  status: number
  constructor(message?: string) {
    super(message || 'API_NOT_FOUND')
    this.status = 404
  }
}
