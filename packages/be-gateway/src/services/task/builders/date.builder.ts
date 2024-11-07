export function getRelativeDate(value: string): Date {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // Handle relative dates with numbers (e.g., "5 days ago")
  const relativeMatch = value.match(/^(\d+)\s+(days|weeks|months|years)\s+(ago|from now)$/)
  if (relativeMatch) {
    const amount = parseInt(relativeMatch[1])
    const unit = relativeMatch[2]
    const direction = relativeMatch[3]
    const multiplier = direction === 'ago' ? -1 : 1

    const result = new Date(startOfDay)
    switch (unit) {
      case 'days':
        result.setDate(result.getDate() + (amount * multiplier))
        return result
      case 'weeks':
        result.setDate(result.getDate() + (amount * 7 * multiplier))
        return result
      case 'months':
        result.setMonth(result.getMonth() + (amount * multiplier))
        return result
      case 'years':
        result.setFullYear(result.getFullYear() + (amount * multiplier))
        return result
    }
  }

  switch (value) {
    case 'today':
      return startOfDay

    case 'yesterday':
      const yesterday = new Date(startOfDay)
      yesterday.setDate(yesterday.getDate() - 1)
      return yesterday

    case 'tomorrow':
      const tomorrow = new Date(startOfDay)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow

    case 'one week ago':
      const oneWeekAgo = new Date(startOfDay)
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return oneWeekAgo

    case 'this week':
      const thisWeek = new Date(startOfDay)
      thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay())
      return thisWeek

    case 'next week':
      const nextWeek = new Date(startOfDay)
      nextWeek.setDate(nextWeek.getDate() - nextWeek.getDay() + 7)
      return nextWeek

    case 'one month ago':
      const oneMonthAgo = new Date(startOfDay)
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      return oneMonthAgo

    case 'this month':
      return new Date(now.getFullYear(), now.getMonth(), 1)

    case 'next month':
      return new Date(now.getFullYear(), now.getMonth() + 1, 1)

    case 'one year ago':
      const oneYearAgo = new Date(startOfDay)
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      return oneYearAgo

    case 'this year':
      return new Date(now.getFullYear(), 0, 1)

    case 'next year':
      return new Date(now.getFullYear() + 1, 0, 1)

    case 'exact date':
      return startOfDay

    default:
      // Try to parse the value as a date string
      const parsedDate = new Date(value)
      return isNaN(parsedDate.getTime()) ? now : parsedDate
  }
}

export function buildDateQuery(path: string, operator: string, value: string, subValue?: string) {
  console.log('sub value', subValue)
  const dateValue = getRelativeDate(value)

  // Helper function to get end of day
  const getEndOfDay = (date: Date) => {
    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)
    return endDate
  }

  switch (operator) {
    case 'is':
      // For relative dates like today, yesterday, tomorrow
      if (['today', 'yesterday', 'tomorrow'].includes(value)) {
        return {
          $and: [
            { [path]: { $gte: dateValue } },
            { [path]: { $lte: getEndOfDay(dateValue) } }
          ]
        }
      }
      return { [path]: dateValue }

    case 'is not':
      if (['today', 'yesterday', 'tomorrow'].includes(value)) {
        return {
          $or: [
            { [path]: { $lt: dateValue } },
            { [path]: { $gt: getEndOfDay(dateValue) } }
          ]
        }
      }
      return { [path]: { $ne: dateValue } }

    case 'is before':
      return { [path]: { $lt: dateValue } }

    case 'is on or before':
      return { [path]: { $lte: getEndOfDay(dateValue) } }

    case 'is after':
      return { [path]: { $gt: getEndOfDay(dateValue) } }

    case 'is on or after':
      return { [path]: { $gte: dateValue } }

    case 'is within':
      let endDate: Date
      switch (value) {
        case 'this week':
          endDate = new Date(dateValue)
          endDate.setDate(endDate.getDate() + 7)
          break
        case 'this month':
          endDate = new Date(dateValue)
          endDate.setMonth(endDate.getMonth() + 1)
          break
        case 'this year':
          endDate = new Date(dateValue)
          endDate.setFullYear(endDate.getFullYear() + 1)
          break
        default:
          endDate = getEndOfDay(dateValue)
      }
      return {
        $and: [
          { [path]: { $gte: dateValue } },
          { [path]: { $lt: endDate } }
        ]
      }

    case 'is empty':
      return {
        $or: [
          { [path]: null },
          { [path]: '' }
        ]
      }

    case 'is not empty':
      return {
        [path]: {
          $exists: true,
          $nin: ['', null]
        }
      }

    default:
      return { [path]: dateValue }
  }
} 
