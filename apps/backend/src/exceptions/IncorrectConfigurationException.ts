
export default class IncorrectConfigurationException extends Error {
  status: number
  constructor(message?: string) {
    super(message || 'INCORRECT_CONFIGURATION')
    this.status = 500
  }
}
