import { useCallback, useEffect, useState } from 'react'
// highlight today's border
import { DragTransferData, IDateProps, PseudoDateTask } from './types'
import { useTaskStore } from 'packages/ui-app/store/task'
import { taskUpdate } from 'packages/ui-app/services/task'
import MonthCellFooter from './MonthCellFooter'
import { MonthCellBody } from './MonthCellBody'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

const defaultVisibleTaskNum = 5
export default function MonthCell({ date, tasks }: IDateProps) {
  const [dateTasks, setDateTasks] = useState<PseudoDateTask[]>(
    (tasks?.sort() || []) as PseudoDateTask[]
  )
  const [moreTaskShown, setMoreTaskShown] = useState<boolean>(true)
  const { updateTask, tasks: storeTasks } = useTaskStore()

  useEffect(() => {
    tasks &&
      // tasks?.length > 0 &&
      setDateTasks(
        [...tasks]
          // (date.getDay() === 0
          //   ? [...tasks]
          //   : [...tasks].filter(
          //       task =>
          //         differenceInCalendarDays(task.pseudoStartedDate, date) === 0
          //     )
          // )
          .sort(
            (a, b) =>
              a.pseudoStartedDate.getTime() - b.pseudoStartedDate.getTime()
          ) || []
      )
  }, [tasks, date])

  const dropHandle = useCallback(
    (e: React.DragEvent<HTMLDivElement>, toDate: Date) => {
      try {
        const { taskId, fromDateString } = JSON.parse(
          e.dataTransfer.getData('text/plain')
        ) as DragTransferData
        if (!taskId || !fromDateString) return
        const task = storeTasks?.filter(task => task.id === taskId)?.[0]
        // TODO: fix when "createdAt and startedAt's ambiguiation"
        if (!task || !task.createdAt || !task.dueDate) return

        const fromDate = new Date(fromDateString)
        const timeDiff = toDate.getTime() - fromDate.getTime()

        // FIX: Not use createdAt as start time
        let {
          createdAt: newCreatedAt,
          dueDate: newDueDate,
          startDate: newStartDate
        } = task
        newCreatedAt = newCreatedAt && new Date(newCreatedAt)
        newDueDate = newDueDate && new Date(newDueDate)
        newStartDate = newStartDate && new Date(newStartDate)

        newStartDate?.setTime(newStartDate.getTime() + timeDiff)
        newCreatedAt?.setTime(newCreatedAt.getTime() + timeDiff)
        newDueDate?.setTime(newDueDate.getTime() + timeDiff)

        const newTask = {
          ...task,
          createdAt: newCreatedAt,
          dueDate: newDueDate,
          startDate: newStartDate
        }
        // TODO: update task by API
        taskUpdate(newTask)
          .then(res => {
            const { status } = res

            if (status !== 200) {
              return
            }

            updateTask(newTask)
          })
          .catch(err => console.log({ err }))
        // updateTask(newTask)
      } catch (err) {
        console.log({ err })
      }
    },
    [storeTasks, updateTask]
  )

  const dragOverHandle = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const toggleShowHideHandle = useCallback(() => {
    setMoreTaskShown(pre => !pre)
  }, [])

  return (
    <div>
      {date ? (
        <div
          className="relative flex flex-col w-full border border-black h-full min-h-[140px] group justify-end"
          onDrop={e => dropHandle(e, date)}
          onDragOver={dragOverHandle}>
          <MonthCellBody
            dateTasks={
              moreTaskShown
                ? dateTasks.slice(0, defaultVisibleTaskNum)
                : dateTasks
            }
            date={date}
          />
          <MonthCellFooter
            date={date}
            moreTasksNum={
              dateTasks.length - defaultVisibleTaskNum <= 0
                ? 0
                : moreTaskShown
                ? -dateTasks.length + defaultVisibleTaskNum
                : dateTasks.length - defaultVisibleTaskNum
            }
            onToggleShowHide={toggleShowHideHandle}
          />
        </div>
      ) : null}
    </div>
  )
}
