import React, { useCallback, useEffect, useState } from 'react'

import { firstWeekDayBeforeMonth } from '@shared/libs'
import MonthCell from './MonthCell'
import { useTaskStore } from 'packages/ui-app/store/task'
import { Task, TaskPayload } from '@prisma/client'
import { PseudoTask } from './types'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import BodyRow from './BodyRow'

interface BodyProps {
  selectedDate: Date
}

export function Body({ selectedDate }: BodyProps) {
  const [cellDates, setCellDates] = useState<Date[]>([])
  const [tasks, setTasks] = useState<PseudoTask[]>([])

  const { tasks: storeTasks } = useTaskStore()

  useEffect(() => {
    try {
      const year = selectedDate.getFullYear()
      const month = selectedDate.getMonth()
      const firstDate = firstWeekDayBeforeMonth(year, month)

      const currentDate = new Date(firstDate)
      const validMonths = [currentDate.getMonth(), month]
      const validDates: Date[] = []

      const addDate = () => {
        validDates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
      }

      // add previous month's day to end of current month
      while (validMonths.includes(currentDate.getMonth())) {
        addDate()
      }

      // add first days of new month
      while (currentDate.getDay() < 6) {
        addDate()
      }
      addDate()

      setCellDates(validDates)
    } catch (err) {
      console.log({ err })
    }
  }, [selectedDate])

  useEffect(() => {
    try {
      const parsedDateTasks = storeTasks
        .map(task => ({
          ...task,
          pseudoStartedDate: task.startDate || task.createdAt,
          dueDate: task.dueDate && new Date(task.dueDate)
        }))
        .map(task => ({
          ...task,
          pseudoStartedDate:
            task.pseudoStartedDate && new Date(task.pseudoStartedDate)
        })) as PseudoTask[]

      setTasks([...parsedDateTasks])
    } catch (err) {
      console.log({ err })
    }
  }, [storeTasks])

  return (
    <div className="overscroll-none overflow-y-auto absolute left-0 right-0 top-0 pt-6 bottom-0 z-5">
      {cellDates.length > 0
        ? Array.from(Array(Math.ceil(cellDates.length / 7)).keys()).map(row => {
            const rowTasks = tasks.map(task => ({
              ...task,
              ...task,
              previousIndexPerRow: undefined
            }))
            return (
              <div key={row} className="relative ">
                <BodyRow
                  tasks={rowTasks}
                  dates={cellDates.slice(row * 7, (row + 1) * 7)}
                />
              </div>
            )
          })
        : null}
    </div>
  )
}
