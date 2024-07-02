import { createContext, useContext, SetStateAction, Dispatch } from 'react'

export enum ICalendarView {
  MONTH = 'MONTH',
  WEEK = 'WEEK'
}

interface ICalendarProps {
  calendarView: ICalendarView,
  setCalendarView: Dispatch<SetStateAction<ICalendarView>>
  month: number
  setMonth: Dispatch<SetStateAction<number>>
}


const CalendarContext = createContext<ICalendarProps>({
  calendarView: ICalendarView.MONTH,
  setCalendarView: () => { console.log(1) },
  month: new Date().getMonth(),
  setMonth: () => {
    console.log('1')
  }
})

export const CalendarProvider = CalendarContext.Provider
export const useCalendarContext = () => {
  const context = useContext(CalendarContext)

  return context
}
