import { createContext, useContext, SetStateAction, Dispatch } from 'react'

interface ICalendarProps {
  month: number
  setMonth: Dispatch<SetStateAction<number>>
}

const CalendarContext = createContext<ICalendarProps>({
  month: new Date().getMonth(),
  setMonth: () => {
    console.log('1')
  }
})

export const CalendarProvider = CalendarContext.Provider
export const useCalendarContext = () => {
  const { month, setMonth } = useContext(CalendarContext)

  return { month, setMonth }
}
