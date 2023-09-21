import { IAutomateThenProps, IAutomateWhenProps } from '@/store/automation'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export enum THEN {
  CHANGE_ASSIGNEE = 'CHANGE_ASSIGNEE',
  CREATE_TASK = 'CREATE_TASK',
  CREATE_SUB_TASK = 'CREATE_SUB_TASK',
  CHANGE_STATUS = 'CHANGE_STATUS',
  CHANGE_PRIORITY = 'CHANGE_PRIORITY',
  CHANGE_DUEDATE = 'CHANGE_DUEDATE',
  CHANGE_PROGRESS = 'CHANGE_PROGRESS',
  DO_COMMENT = 'DO_COMMENT',
  DUPLICATE = 'DUPLICATE'
}

export enum WHEN {
  STATUS_CHANGED = 'STATUS_CHANGED',
  PROGRESS_CHANGED = 'PROGRESS_CHANGED',
  PRIORITY_CHANGED = 'PRIORITY_CHANGED',
  DUEDATE_CHANGED = 'DUEDATE_CHANGED',
  ASSIGNEE_ADDED = 'ASSIGNEE_ADDED',
  ASSIGNEE_REMOVED = 'ASSIGNEE_REMOVED',
  DUEDATE_ARRIVES = 'DUEDATE_ARRIVES',
  STARTDATE_ARRIVES = 'STARTDATE_ARRIVES'
}

export const whenOptions = [
  { id: WHEN.STATUS_CHANGED, title: 'Status changes' },
  { id: WHEN.PROGRESS_CHANGED, title: 'Progress changes' },
  { id: WHEN.PRIORITY_CHANGED, title: 'Priority changes' },
  { id: WHEN.DUEDATE_CHANGED, title: 'Due date changes' }
  // { id: WHEN.ASSIGNEE_ADDED, title: 'Assignee added' },
  // { id: WHEN.ASSIGNEE_REMOVED, title: 'Assignee removed' },
  // { id: WHEN.DUEDATE_ARRIVES, title: 'Due date arrives' },
  // { id: WHEN.STARTDATE_ARRIVES, title: 'Start date arrives' }
]

export const thenOptions = [
  // { id: THEN.CHANGE_ASSIGNEE, title: 'Change assignees' },
  // { id: THEN.CREATE_TASK, title: 'Create a task' },
  // { id: THEN.CREATE_SUB_TASK, title: 'Create a subtask' },
  { id: THEN.CHANGE_STATUS, title: 'Change status' },
  // { id: THEN.CHANGE_PRIORITY, title: 'Change priority' },
  { id: THEN.CHANGE_DUEDATE, title: 'Change due date' },
  { id: THEN.CHANGE_PROGRESS, title: 'Change progress' }
  // { id: THEN.DO_COMMENT, title: 'Do comment' },
  // { id: THEN.DUPLICATE, title: 'Duplicate' }
]

export const dueDateOptions = [
  { id: 'present-day', title: 'Present day' },
  // { id: 'last-week', title: 'Last week' },
  // { id: 'last-month', title: 'Last month' },
  { id: 'next-7-days', title: 'Next 7 days' },
  { id: 'next-30-days', title: 'Next 30 days' }
]

interface IAutomateContextProps {
  when: IAutomateWhenProps
  setWhen: Dispatch<SetStateAction<IAutomateWhenProps>>
  then: IAutomateThenProps
  setThen: Dispatch<SetStateAction<IAutomateThenProps>>
}

const AutomateContext = createContext<IAutomateContextProps>({
  when: {
    happens: 'on-task',
    is: WHEN.PROGRESS_CHANGED,
    valueFrom: '',
    valueTo: '',
    equal: ''
  },
  then: {
    change: '',
    value: ''
  },
  setWhen: () => {
    console.log(1)
  },
  setThen: () => {
    console.log(1)
  }
})

export const AutomateProvider = AutomateContext.Provider

export const useAutomateContext = () => {
  const { when, setWhen, then, setThen } = useContext(AutomateContext)

  const setWhenField = (name: keyof typeof when, val: string) => {
    setWhen(prev => ({ ...prev, [name]: val }))
  }

  const setThenField = (name: keyof typeof then, val: string) => {
    setThen(prev => ({ ...prev, [name]: val }))
  }

  return {
    when,
    setWhen,
    setWhenField,
    then,
    setThenField,
    setThen
  }
}
