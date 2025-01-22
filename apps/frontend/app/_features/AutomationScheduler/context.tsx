import { createContext, useContext } from "react";

export interface ISchedulerTriggerAtField {
  hour: number,
  minute: number,
  period: 'am' | 'pm'
}

export type ISchedulerTriggerEveryField = 'day' | 'weekday' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | ''

export interface ISchedulerTrigger {
  every?: ISchedulerTriggerEveryField
  at?: ISchedulerTriggerAtField
}

export interface IScheduleAction {
  group: 'notification' | ''
  config: {
    [key: string]: unknown
  }
}

export interface ISchedulerContext {
  trigger: ISchedulerTrigger
  // action: IScheduleAction
  setTrigger: (trigger: ISchedulerTrigger) => void
}

const today = new Date()
const SchedulerContext = createContext<ISchedulerContext>({
  trigger: {
    every: '',
    at: {
      hour: today.getHours(),
      minute: today.getMinutes(),
      period: 'am'
    }
  },
  // action: {
  //   group: '',
  //   config: {
  //
  //   }
  // },
  setTrigger: () => console.log(1)
})

export const SchedulerProvider = SchedulerContext.Provider

export const useSchedulerContext = () => {
  const context = useContext(SchedulerContext)
  return context
}
