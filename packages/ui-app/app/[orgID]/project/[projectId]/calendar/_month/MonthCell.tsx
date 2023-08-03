import { useCallback, useEffect, useState } from 'react'
// highlight today's border
import { DragTransferData, IMonthCell, PseudoTask } from './types'
import { useTaskStore } from 'packages/ui-app/store/task'
import { taskUpdate } from 'packages/ui-app/services/task'
import MonthCellFooter from './MonthCellFooter'
import { MonthCellBody } from './MonthCellBody'

const defaultVisibleTaskNum = 5
export default function MonthCell({
  date,
  tasks,
  moreTaskShown,
  toggleShowHideHandle
}: IMonthCell) {
  const [dateTasks, setDateTasks] = useState<PseudoTask[]>(
    (tasks?.sort() || []) as PseudoTask[]
  )
  const { updateTask, tasks: storeTasks } = useTaskStore()
  const [overTaskNum, setOverTaskNum] = useState<number>(0)
  useEffect(() => {
    const overNum = dateTasks
      .slice(defaultVisibleTaskNum, dateTasks.length)
      .filter(task => !!task).length
    setOverTaskNum(overNum)
  }, [dateTasks])

  useEffect(() => {
    tasks &&
      setDateTasks(() => {
        const withPreviousIndexTasks = [] as (PseudoTask & {
          previousIndexPerRow: number
        })[]
        const withoutPreviousIndexTasks: PseudoTask[] = []

        tasks.forEach(task => {
          if (
            task?.previousIndexPerRow !== undefined &&
            task?.previousIndexPerRow !== null
          )
            withPreviousIndexTasks.push(task)
          else withoutPreviousIndexTasks.push(task)
        })

        withPreviousIndexTasks.sort(
          (a, b) => -a.previousIndexPerRow + b.previousIndexPerRow
        )
        const maxPreviousIndex =
          withPreviousIndexTasks?.[0]?.previousIndexPerRow

        const arrangedTasksLength = !maxPreviousIndex
          ? tasks.length
          : maxPreviousIndex > tasks.length
          ? maxPreviousIndex + 1
          : tasks.length

        const arrangedTasks = Array(arrangedTasksLength).fill(
          null
        ) as PseudoTask[]
        withPreviousIndexTasks.forEach(task => {
          arrangedTasks[task.previousIndexPerRow] = task
        })

        withoutPreviousIndexTasks.reverse()

        arrangedTasks.forEach((_, i, arrangedTasks) => {
          if (arrangedTasks[i]) return

          const task = withoutPreviousIndexTasks.pop()
          if (!task) return
          arrangedTasks[i] = task
          arrangedTasks[i].previousIndexPerRow = i
        })
        return arrangedTasks
      })
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
            moreTasksNum={moreTaskShown ? -overTaskNum : overTaskNum}
            onToggleShowHide={toggleShowHideHandle}
          />
        </div>
      ) : null}
    </div>
  )
}
