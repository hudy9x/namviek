type DateOperation = '>' | '>=' | '=' | '<' | '<='
type DateString = 'today' | 'week' | 'month'
type DateWithOperation = [DateOperation, DateString]

export interface ICompConfig {
  date?: DateWithOperation
  [key: string]: unknown
}
export interface IDbCompProps {
  id: string
  title: string
  config: ICompConfig
}

const refactorDate = (operator: DateOperation, date: DateString) => {
  const config: {
    startDate?: Date | null
    endDate?: Date | null
  } = {}

  if (date === 'today') {
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

  if (date === 'month') {
    const d = new Date()

    if (operator === '=') {
      const firstDateOfMonth = new Date(d.getFullYear(), d.getMonth(), 1)
      const lastDateOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, -1)
      config.startDate = firstDateOfMonth
      config.endDate = lastDateOfMonth
    }
  }

  return config
}

export const refactorConfig = (config: ICompConfig) => {
  if (config.date) {
    const [operator, dateStr] = config.date

    config = { ...config, ...refactorDate(operator, dateStr) }

    delete config.date
  }
  return config
}
