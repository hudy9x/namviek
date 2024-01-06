export default class MaxStorageSizeException extends Error {
  status: number
  constructor(message?: string) {
    super(message || 'MAX_SIZE_STORAGE')
    this.status = 500
  }
}
