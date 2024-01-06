export default class StorageConfigurationNotFoundException extends Error {
  status: number
  constructor(message?: string) {
    super(message || 'STORAGE_CONFIG_NOT_FOUND')
    this.status = 500
  }
}
