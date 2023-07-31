export const days = [
  'Sunday',
  'Monday',
  'Tuseday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const firstWeekDayOfMonth = (year: number, month: number) => {
  const firstDateOfMonth = new Date(year, month, 1)
  return days[firstDateOfMonth.getDate()]
}

export const firstWeekDayBeforeMonth = (year: number, month: number) => {
  const firstDateOfMonth = new Date(year, month, 1)
  let weekDayNum = firstDateOfMonth.getDay()
  if (weekDayNum === 0) {
    return firstDateOfMonth
  }

  const firstNearestDateOfWeek = new Date(firstDateOfMonth)
  while (weekDayNum > 0) {
    firstNearestDateOfWeek.setDate(firstNearestDateOfWeek.getDate() - 1)
    weekDayNum = firstNearestDateOfWeek.getDay()
  }

  return firstNearestDateOfWeek
}
