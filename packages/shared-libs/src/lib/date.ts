import { format } from 'date-fns'

export function getDatesInMonth(date: Date) {
  console.log('a')
}

export function dateFormat(date: number | Date, formatString: string) {
  return format(date, formatString)
}

export function padZero(n: number) {
  return n < 10 ? '0' + n : n
}

export function extracDatetime(dt: Date) {
  const y = dt.getFullYear()
  const m = dt.getMonth()
  const d = dt.getDate()
  const hour = dt.getHours()
  const min = dt.getMinutes()

  return { y, m, d, hour, min }
}

export function isDateEqual(dateLeft: Date, dateRight: Date): boolean {
  const d1 = [
    dateLeft.getFullYear(),
    dateLeft.getMonth(),
    dateLeft.getDate()
  ].join('-')
  const d2 = [
    dateRight.getFullYear(),
    dateRight.getMonth(),
    dateRight.getDate()
  ].join('-')

  return d1 === d2
}

export function getLastDateOfMonth(d: Date) {
  const date = new Date(d.getTime())

  // next month
  date.setMonth(date.getMonth() + 1)

  // last date
  date.setDate(1)
  date.setHours(-1)

  return date
}

export function getMonthList() {
  return 'January, February, March, April, May, June, July, August, September, October, November, December'.split(
    ','
  )
}

const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export function getDayName(d: Date) {
  const dIndex = d.getDay()

  return dayArr[dIndex]
}

export function isToday(today: Date, date: Date) {
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export function isSunday(d: Date) {
  return d.getDay() === 0
}

export function isSaturday(d: Date) {
  return d.getDay() === 6
}

export function isSunSat(d: Date) {
  return isSunday(d) || isSaturday(d)
}

export function getFirstDateOfMonth(d: Date) {
  d.setDate(1)
  return d
}

export function genAWeekOfDate(date: Date) {
  const day = date.getDay()

  const week = []
  const weekLen = 7

  let i = 0

  while (i < weekLen) {
    const d = new Date(date.getTime())
    const distance = day - i

    d.setDate(d.getDate() - distance)
    week.push(d)
    i++
  }

  return week
}

function genFirstWeekInMonth(d: Date) {
  const firstDateOfMonth = getFirstDateOfMonth(d)
  return genAWeekOfDate(firstDateOfMonth)
}

function getLastDateInMonth(d: Date) {
  const lastDateOfMonth = getLastDateOfMonth(d)
  return lastDateOfMonth
}

export function genCalendarArr(d: Date) {
  const calendars = []
  const month = d.getMonth()
  const lastDateInThisMonth = getLastDateInMonth(d).getDate()

  const firstWeek = genFirstWeekInMonth(d)

  calendars[0] = firstWeek

  let going = true

  while (going) {
    const lastItem = calendars[calendars.length - 1]
    if (!lastItem) {
      going = false
      break
    }

    const lastDate = lastItem[lastItem.length - 1]
    const ldate = lastDate.getDate()
    const lmonth = lastDate.getMonth()

    if (lmonth > month || ldate === lastDateInThisMonth) {
      going = false
      break
    }

    const nextDate = new Date(lastDate.getTime())
    nextDate.setDate(nextDate.getDate() + 1)

    const week = genAWeekOfDate(nextDate)
    calendars.push(week)
  }

  return calendars
}
