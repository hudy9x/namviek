function getStartAndEndTime(date: Date) {
  const startTime = new Date(date);
  startTime.setHours(0, 0, 0, 0); // Set to start of the day

  const endTime = new Date(date);
  endTime.setHours(23, 59, 59, 999); // Set to end of the day

  return [startTime, endTime];
}

function getThisWeekStartAndEnd(date: Date) {
  const currentDate = new Date(date);

  // Calculate the previous Monday
  const previousMonday = new Date(currentDate);
  previousMonday.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7); // Adjust to previous Monday

  // Calculate the previous Sunday
  const previousSunday = new Date(previousMonday);
  previousSunday.setDate(previousMonday.getDate() + 6); // Move to the following Sunday

  return [previousMonday, previousSunday];
}

function getPreviousSunday(date: Date) {
  const previousSunday = new Date(date);
  previousSunday.setDate(date.getDate() - date.getDay());
  return previousSunday;
}

function getNextMonday(date: Date): Date {
  // Create a new date object to avoid modifying the input
  const nextMonday = new Date(date)

  // Reset time to start of day
  nextMonday.setHours(0, 0, 0, 0)

  // Get current day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDay = nextMonday.getDay()

  // Calculate days to add to get to next Monday
  const daysToAdd = currentDay === 0 ? 1 : // If Sunday, add 1 day
    currentDay === 1 ? 7 : // If Monday, add 7 days (next Monday)
      8 - currentDay // For other days, calculate remaining days until next Monday

  // Add the calculated days
  nextMonday.setDate(nextMonday.getDate() + daysToAdd)

  return nextMonday
}

function getMonthRange(date: Date): Date[] {
  // Create start date: 1st day of the month at 00:00:00
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
  startDate.setHours(0, 0, 0, 0)

  // Create end date: last day of the month at 23:59:59.999
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  endDate.setHours(23, 59, 59, 999)

  return [startDate, endDate]
}

function getFirstDateOfPrevMonth(date: Date): Date {
  // Create new date object to avoid modifying the input
  const firstDate = new Date(date)

  // Set to first day of current month
  firstDate.setDate(1)

  // Move to previous month
  firstDate.setMonth(firstDate.getMonth() - 1)

  // Reset time to start of day
  firstDate.setHours(0, 0, 0, 0)

  return firstDate
}

function getFirstDateOfPrevYear(date: Date): Date {
  const d = new Date(date)
  const year = d.getFullYear();
  const passDate = new Date(year - 1, 0, 1)
  passDate.setHours(0, 0, 0, 0)

  return passDate
}
function getFirstDateOfNextYear(date: Date): Date {
  const d = new Date(date)
  const year = d.getFullYear();
  const futureDate = new Date(year + 1, 0, 1)
  futureDate.setHours(0, 0, 0, 0)

  return futureDate
}

function getFirstDateOfNextMonth(date: Date): Date {
  // Create new date object to avoid modifying the input
  const firstDate = new Date(date)

  // Set to first day of current month
  firstDate.setDate(1)

  // Move to previous month
  firstDate.setMonth(firstDate.getMonth() + 1)

  // Reset time to start of day
  firstDate.setHours(0, 0, 0, 0)

  return firstDate
}

function getFirstAndLastDateOfYear(date) {
  const year = new Date(date).getFullYear();

  // First date of the year (January 1st at 00:00)
  const firstDate = new Date(year, 0, 1, 0, 0, 0, 0); // January is month 0

  // Last date of the year (December 31st at 23:59)
  const lastDate = new Date(year, 11, 31, 23, 59, 59, 999); // December is month 11

  return [firstDate, lastDate];
}


export function getRelativeDate(value: string, subValue?: string): Date[] {

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Handle specific date strings
  const yesterday = new Date(startOfDay);
  const tomorrow = new Date(startOfDay);
  const parsedDate = new Date(value);


  switch (value) {
    case 'today':
      return getStartAndEndTime(startOfDay);

    case 'yesterday':
      yesterday.setDate(yesterday.getDate() - 1);
      return getStartAndEndTime(yesterday);

    case 'tomorrow':
      tomorrow.setDate(tomorrow.getDate() + 1);
      return getStartAndEndTime(tomorrow);

    case 'one week ago':
      return getThisWeekStartAndEnd(getPreviousSunday(startOfDay));

    case 'this week':
      return getThisWeekStartAndEnd(startOfDay);

    case 'next week':
      return getThisWeekStartAndEnd(getNextMonday(startOfDay));

    // -----------------------------------------------------------------
    case 'one month ago':
      return getMonthRange(getFirstDateOfPrevMonth(startOfDay))

    case 'this month':
      return getMonthRange(startOfDay)

    case 'next month':
      return getMonthRange(getFirstDateOfNextMonth(startOfDay))

    case 'one year ago':
      // oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      // return oneYearAgo;
      return getFirstAndLastDateOfYear(getFirstDateOfPrevYear(startOfDay))

    case 'this year':
      // return new Date(now.getFullYear(), 0, 1);
      return getFirstAndLastDateOfYear(startOfDay)

    case 'next year':
      // return new Date(now.getFullYear() + 1, 0, 1);
      return getFirstAndLastDateOfYear(getFirstDateOfNextYear(startOfDay))

    case 'exact date':
      return getStartAndEndTime(subValue ? new Date(subValue) : startOfDay);

    default:
      // Try to parse the value as a date string
      return getStartAndEndTime(isNaN(parsedDate.getTime()) ? now : parsedDate);
  }
}

export function buildDateQuery(path: string, operator: string, value: string, subValue?: string) {
  console.log('sub value', subValue);
  const dateValue = getRelativeDate(value, subValue);

  switch (operator) {
    case 'is':
      // return handleIsOperator(path, value, dateValue);
      return {
        $and: [
          { [path]: { $gte: dateValue[0] } },
          { [path]: { $lte: dateValue[1] } }
        ]
      };

    case 'is not':
      // return handleIsNotOperator(path, value, dateValue);
      return {
        $or: [
          { [path]: { $gte: dateValue[0] } },
          { [path]: { $lte: dateValue[1] } }
        ]
      };

    case 'is before':
      return { [path]: { $lte: dateValue[0] } };

    case 'is after':
      return { [path]: { $gte: dateValue[1] } };

    // case 'is within':
    //   return handleIsWithin(path, value, dateValue, getEndOfDay);

    case 'is empty':
      return {
        $or: [
          { [path]: null },
          { [path]: '' }
        ]
      };

    case 'is not empty':
      return {
        [path]: {
          $exists: true,
          $nin: ['', null]
        }
      };

    default:
      return { [path]: dateValue };
  }
}

