import { Task } from '@prisma/client'
import TaskCreate from '../TaskCreatePopover'
import { useCallback, useEffect, useState } from 'react'

// highlight today's border
import { DragTransferData, IDateProps, PseudoDateTask } from './types'
import { useTaskStore } from 'packages/ui-app/store/task'
import MonthTask from './MonthTask'
import { taskUpdate } from 'packages/ui-app/services/task'

export default function MonthCell({ date, tasks }: IDateProps) {
  const [dateTasks, setDateTasks] = useState<PseudoDateTask[]>(
    (tasks?.sort() || []) as PseudoDateTask[]
  )
  const { updateTask, tasks: storeTasks } = useTaskStore()

  useEffect(() => {
    tasks &&
      // tasks?.length > 0 &&
      setDateTasks(
        [...tasks].sort(
          (a, b) =>
            a.pseudoStartedDate.getTime() - b.pseudoStartedDate.getTime()
        ) || []
      )
  }, [tasks])

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

  return (
    <div>
      {date ? (
        <div
          className="relative flex flex-col w-full border border-black min-h-[140px] group items-center "
          onDrop={e => dropHandle(e, date)}
          onDragOver={dragOverHandle}>
          {dateTasks?.length
            ? dateTasks.map((task, i) => (
                <MonthTask key={i} task={task} date={date} />
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
      ) : null}
    </div>
  )
}
