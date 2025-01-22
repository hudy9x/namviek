import { addDays, lastDayOfMonth, setHours, subDays, subMonths } from 'date-fns'

export const extractDueDate = ({
  dateOperator,
  date,
  start,
  end
}: {
  dateOperator: string
  date: string
  start: Date | undefined
  end: Date | undefined
}) => {
  if (date === 'date-range') {
    start && start.setHours(0)
    end && to23h59m(end)

    return { startDate: start, endDate: end }
  }

  if (date === 'not-set') {
    return { startDate: 'not-set', endDate: 'not-set' }
  }

  if (date === 'any') {
    return { startDate: 'any', endDate: 'any' }
  }

  const { startDate, endDate } = fromDateStringToDateObject(dateOperator, date)

  return {
    startDate,
    endDate
  }
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

export const to23h59m = (d: Date) => {
  d.setHours(23)
  d.setMinutes(59)
  d.setSeconds(0)
}
export const to00h00m = (d: Date) => {
  d.setHours(-1)
}

export const fromDateStringToDate = (date: string) => {
  switch (date) {
    case 'next-7-days':
      return addDays(new Date(), 7)

    case 'next-30-days':
      return addDays(new Date(), 30)

    // present day
    default:
      return new Date()
  }
}

type DateStringResult = {
  startDate: Date | null
  endDate: Date | null
}
export const fromDateStringToDateObject = (
  operator: string,
  dateStr: string
): DateStringResult => {
  const config: DateStringResult = { startDate: null, endDate: null }
  const today = new Date()
  to00h00m(today)

  operator = operator || '='

  if (dateStr === 'yesterday') {
    if (operator === '=') {
      const yesterday = subDays(new Date(), 1)
      const morningYesterday = setHours(yesterday, -1)
      const lastNight = setHours(yesterday, 23)

      config.startDate = morningYesterday
      config.endDate = lastNight
      // config.startDate = new Date(2023, 7, 21, 0, 0, 0)
      // config.endDate = new Date(2023, 7, 21, 23, 59, 0)
    }
  }

  if (dateStr === 'tomorrow') {
    if (operator === '=') {
      const yesterday = addDays(new Date(), 1)
      const morningYesterday = setHours(yesterday, -1)
      const lastNight = setHours(yesterday, 23)

      config.startDate = morningYesterday
      config.endDate = lastNight
      // config.startDate = new Date(2023, 7, 21, 0, 0, 0)
      // config.endDate = new Date(2023, 7, 21, 23, 59, 0)
    }
  }

  if (dateStr === 'today') {
    if (operator === '=') {
      const endDay = new Date()
      to23h59m(endDay)
      config.startDate = today
      config.endDate = endDay
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

  if (['week', 'this-week'].includes(dateStr)) {
    const [mon, sat] = getMondayNSaturdayInWeek(new Date())

    if (operator === '=') {
      config.startDate = mon
      config.endDate = sat
    }

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
  }

  if (['prev-week'].includes(dateStr)) {
    const [mon, sat] = getMondayNSaturdayInWeek(subDays(new Date(), 7))

    config.startDate = mon
    config.endDate = sat
  }

  if (['month', 'this-month'].includes(dateStr)) {
    const [firstDate, lastDate] = getStartNEndDateOfMonth(new Date())

    to00h00m(firstDate)
    to23h59m(lastDate)
    if (operator === '=') {
      config.startDate = firstDate
      config.endDate = lastDate
    }

    if (operator === '>') {
      config.startDate = lastDate
      config.endDate = null
    }

    if (operator === '<') {
      config.startDate = null
      config.endDate = firstDate
    }
  }

  if (['prev-month'].includes(dateStr)) {
    const date = subMonths(new Date(), 1)
    const [firstDate, lastDate] = getStartNEndDateOfMonth(date)

    to00h00m(firstDate)
    to23h59m(lastDate)
    config.startDate = firstDate
    config.endDate = lastDate
  }

  return config
}
