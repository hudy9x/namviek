type DateOperation = '>' | '>=' | '=' | '<' | '<='
type DateString = 'today' | 'week' | 'month'
type DateWithOperation = [DateOperation, DateString]

export interface ICompConfig {
  date?: DateWithOperation
  [key: string]: unknown
}
export interface IDbCompProps {
  title: string
  config: ICompConfig
}

export const refactorConfig = (config: ICompConfig) => {
  if (config.date) {
    const [operator, dateStr] = config.date

    if (dateStr === 'today') {
      const today = new Date()

      if (operator === '=') {
        config.startDate = today
        config.endDate = today
      }

      if (operator === '<') {
        config.startDate = null
        config.endDate = today
      }

      if (operator === '>') {
        config.startDate = today
        config.endDate = null
      }
    }

    delete config.date

    console.log(config)
  }
  return config
}
