import React, { useCallback, useEffect, useState } from 'react'

import { firstWeekDayBeforeMonth } from '@shared/libs'
import DateOfMonth from './DateOfMonth'
import { useTaskStore } from 'packages/ui-app/store/task'
import { Task, TaskPayload } from '@prisma/client'
import { PseudoDateTask } from './types'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

// const storeTasks: Task[] = [
//   {
//     id: '64bd0302b856844fcc71ad9d',
//     title: 'Giao diện tạo mới counpon fajfkasjfklsadfj afa s',
//     desc: null,
//     dueDate: new Date('2023-07-31'),
//     startDate: null,
//     projectId: '649fe3033fdbc2fcad4d419e',
//     priority: null,
//     taskStatusId: '64a2741d10848bf6cbdd6e72',
//     tagIds: [],
//     assigneeIds: ['64a243bcfb17d4eadfa8da7c'],
//     parentTaskId: null,
//     taskPoint: 2,
//     createdBy: '64a62f584a6a607b69906352',
//     createdAt: '2023-07-24T10:37:45.029Z',
//     updatedBy: null,
//     updatedAt: null
//   },
//   {
//     id: '64bd0302b856844fcc71ad9d',
//     title: ' mới counpon Giao diện tạo ajfksdlf fj aklfjsa f',
//     desc: null,
//     dueDate: new Date('2023-08-02'),
//     startDate: null,
//     projectId: '649fe3033fdbc2fcad4d419e',
//     priority: null,
//     taskStatusId: '64a2741d10848bf6cbdd6e72',
//     tagIds: [],
//     assigneeIds: ['64a243bcfb17d4eadfa8da7c'],
//     parentTaskId: null,
//     taskPoint: 2,
//     createdBy: '64a62f584a6a607b69906352',
//     createdAt: '2023-07-23T10:37:45.029Z',
//     updatedBy: null,
//     updatedAt: null
//   },
//   {
//     id: '64bd0302b856844fcc71ad9d',
//     title: ' counpon ',
//     desc: null,
//     dueDate: new Date('2023-07-23'),
//     startDate: null,
//     projectId: '649fe3033fdbc2fcad4d419e',
//     priority: null,
//     taskStatusId: '64a2741d10848bf6cbdd6e72',
//     tagIds: [],
//     assigneeIds: ['64a243bcfb17d4eadfa8da7c'],
//     parentTaskId: null,
//     taskPoint: 2,
//     createdBy: '64a62f584a6a607b69906352',
//     createdAt: '2023-07-23T10:37:45.029Z',
//     updatedBy: null,
//     updatedAt: null
//   }
// ]

interface BodyProps {
  selectedDate: Date
}

// console.log(
//   differenceInCalendarDays(new Date('2023-08-10'), new Date('2023-07-25')),
//   differenceInCalendarDays(new Date('2023-07-25'), new Date('2023-07-25')),
//   differenceInCalendarDays(new Date('2023-07-20'), new Date('2023-07-25'))
// )
// console.log(
//   differenceInCalendarDays(
//     new Date('2023-07-23T10:37:45.029Z'),
//     new Date('2023-8-1')
//   )
// )

export function Body({ selectedDate }: BodyProps) {
  const [cellDates, setCellDates] = useState<Date[]>([])
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

      // console.log({ validDates })
      setCellDates(validDates)
    } catch (err) {
      console.log({ err })
    }
  }, [selectedDate])

  const [tasks, setTasks] = useState<PseudoDateTask[]>([])
  // storeTasks.map(task => ({
  //   ...task,
  //   pseudoStartedDate: task.startDate || task.createdAt,
  //   dueDate: task.dueDate && new Date(task.dueDate)
  // })) as PseudoDateTask[]

  useEffect(() => {
    console.log({ logfjskaf: 'storeTAsk changeed' })
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
        })) as PseudoDateTask[]

      // console.log({ parsedDateTasks })
      setTasks([...parsedDateTasks])
    } catch (err) {
      console.log({ err })
    }
    // }, [])
  }, [storeTasks])

  const isTaskOnDate = useCallback((task: PseudoDateTask, date: Date) => {
    // const taskStartDate = task.startDate ?? task.createdAt
    const taskStartDate = task.pseudoStartedDate
    const taskDueDate = task.dueDate
    if (!taskStartDate || !taskDueDate) return false

    return (
      differenceInCalendarDays(taskStartDate, date) <= 0 &&
      differenceInCalendarDays(date, taskDueDate) <= 0
    )
  }, [])

  return (
    <div className="overscroll-none overflow-y-auto absolute left-0 right-0 top-0 bottom-0 z-5">
      {cellDates.length > 0
        ? Array.from(Array(6).keys()).map(row => (
            <div className="relative grid grid-cols-7" key={row}>
              {Array.from(Array(7).keys()).map(column => (
                <DateOfMonth
                  date={cellDates[row * 7 + column]}
                  key={column}
                  tasks={tasks.filter(task =>
                    isTaskOnDate(task, cellDates[row * 7 + column])
                  )}
                />
              ))}
            </div>
          ))
        : null}
    </div>
  )
}
