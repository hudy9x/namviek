import { Task } from '@prisma/client'
import TaskCreate from '../TaskCreatePopover'
import { useCallback, useEffect, useState } from 'react'

// highlight today's border
import { DragTransferData, IDateProps, PseudoDateTask } from './types'
import { useTaskStore } from 'packages/ui-app/store/task'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

export default function DateOfMonth({ date, tasks }: IDateProps) {
  const [dateTasks, setDateTasks] = useState<PseudoDateTask[]>(
    (tasks?.sort() || []) as PseudoDateTask[]
  )

  const { updateTask, tasks: storeTasks } = useTaskStore()

  useEffect(() => {
    console.log('rerender time', tasks?.length)
    tasks &&
      tasks?.length > 0 &&
      setDateTasks(
        [...tasks].sort(
          (a, b) =>
            a.pseudoStartedDate.getTime() - b.pseudoStartedDate.getTime()
        ) || []
      )
  }, [tasks, storeTasks])

  const dragStartHandle = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      task: PseudoDateTask,
      fromDate: string
    ) => {
      e.dataTransfer.setData(
        'text/plain',
        JSON.stringify({
          taskId: task.id,
          fromDateString: fromDate
        } as DragTransferData)
      )
      e.dataTransfer.effectAllowed = 'move'
      // console.log({ e })
    },
    []
  )

  const dropHandle = useCallback(
    (e: React.DragEvent<HTMLDivElement>, toDate: Date) => {
      try {
        const { taskId, fromDateString } = JSON.parse(
          e.dataTransfer.getData('text/plain')
        ) as DragTransferData
        console.log({ taskId, fromDateString })
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

        updateTask({
          ...task,
          createdAt: newCreatedAt,
          dueDate: newDueDate,
          startDate: newStartDate
        })
      } catch (err) {
        console.log({ err })
      }
    },
    [dateTasks, updateTask]
  )

  const dragOverHandle = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  return (
    <div
      className="relative flex flex-col w-full border border-black min-h-[140px] group items-center "
      onDrop={e => dropHandle(e, date)}
      onDragOver={dragOverHandle}>
      {dateTasks?.length
        ? dateTasks.map((task, i) => (
            <div key={i} className=" mb-1 w-full h-6 ">
              {differenceInCalendarDays(task.pseudoStartedDate, date) === 0 ||
              date.getDay() === 0 ? (
                <div
                  draggable
                  onDragStart={e =>
                    dragStartHandle(e, task, task.pseudoStartedDate.toJSON())
                  }
                  style={{
                    width: `${
                      (7 - date.getDay() <
                      differenceInCalendarDays(task.dueDate, date)
                        ? 7 - date.getDay()
                        : differenceInCalendarDays(task.dueDate, date) + 1) *
                      100
                    }%`
                  }}
                  className={
                    'relative bg-slate-400 z-20 overflow-hidden whitespace-nowrap text-ellipsis '
                  }>
                  {task.title}
                </div>
              ) : (
                <div className=" relative invisible box-border "></div>
              )}
            </div>
          ))
        : null}
      <TaskCreate
        triggerButton={
          <button className="absolute bottom-3 right-10 invisible group-hover:visible">
            +
          </button>
        }
      />
      <div className="absolute bottom-3 right-3">{date.getDate()}</div>
    </div>
  )
}
