export default class DataAccessException extends Error {
  status: number
  constructor(message?: string) {
    super(`Database Access Error: ${message}` || 'Database access exception')
    this.status = 500
  }
}
