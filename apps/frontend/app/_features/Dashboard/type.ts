import { DashboardComponentType } from '@prisma/client'
import { lastDayOfMonth, subDays } from 'date-fns'

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
  type?: DashboardComponentType
  config: ICompConfig
}

const getMondayNSaturdayInWeek = (d: Date) => {
  const mon = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay())
  const sat = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + (5 - d.getDay() + 1)
  )

  return [mon, sat]
}

const getStartNEndDateOfMonth = (d: Date) => {
  return [new Date(d.getFullYear(), d.getMonth(), 1), lastDayOfMonth(d)]
}

const to23h59m = (d: Date) => {
  d.setHours(23)
  d.setMinutes(59)
  d.setSeconds(0)
}
const to00h00m = (d: Date) => {
  d.setHours(23)
  d.setMinutes(59)
  d.setSeconds(0)
}

export const refactorConfig = (config: ICompConfig) => {
  if (config.date) {
    const [operator, dateStr] = config.date
    const today = new Date()
    to00h00m(today)

    if (dateStr === 'today') {
      if (operator === '=') {
        config.startDate = today
        config.endDate = today
      }

      if (operator === '<') {
        // must -- date cuz the query on server side is <=
        const yesterday = subDays(today, 1)
        config.startDate = null
        config.endDate = yesterday
      }

      if (operator === '>') {
        // must +1 date cuz the query on server side is >=
        to23h59m(today)
        config.startDate = today
        config.endDate = null
      }
    }

    if (dateStr === 'week') {
      const [mon, sat] = getMondayNSaturdayInWeek(new Date())
      
      if (operator === '>') {
        to23h59m(sat)
        config.startDate = sat
        config.endDate = null
      }

      if (operator === '<') {
        // must -- date cuz the query on server side is <=
        to00h00m(mon)
        config.startDate = null
        config.endDate = mon
      }

      config.startDate = mon
      config.endDate = sat
    }

    if (dateStr === 'month') {
      const [firstDate, lastDate] = getStartNEndDateOfMonth(new Date())

      to00h00m(firstDate)
      to23h59m(lastDate)

      if (operator === '>') {
        config.startDate = lastDate
        config.endDate = null
      }

      if (operator === '<') {
        config.startDate = null
        config.endDate = firstDate
      }

      config.startDate = firstDate
      config.endDate = lastDate
    }
  }
  return config
}
