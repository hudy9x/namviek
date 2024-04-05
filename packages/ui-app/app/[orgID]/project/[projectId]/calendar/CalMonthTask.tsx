import { Draggable } from 'react-beautiful-dnd'
import { useStatusData } from '@/hooks/useStatusData'
import CalTaskInMonth from './CalTaskInMonth'
import { ICalendarView, useCalendarContext } from './context'
import CalTaskInWeek from './CalTaskInWeek'
import Link from 'next/link'
import useTaskFilterContext from '@/features/TaskFilter/useTaskFilterContext'
import { TaskType } from '@prisma/client'

interface ICalMonthTaskProps {
  id: string
  link: string
  title: string
  type: TaskType
  time: string
  assigneeId: string
  taskStatusId: string
  index: number
  classes?: Array<string>
}

export default function CalMonthTask({
  index,
  link,
  type: taskType,
  time,
  id,
  title,
  assigneeId,
  taskStatusId,
  classes = []
}: ICalMonthTaskProps) {
  const { filter } = useTaskFilterContext()
  const { statusIds: filterStatusIds } = filter
  const { color } = useStatusData(taskStatusId || '')
  const { calendarView } = useCalendarContext()

  const taskClasses = ['calendar-task-item']
  classes?.length && taskClasses.push(...classes)

  const view = () => (
    <Link href={link}>
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="relative">
            <div className={taskClasses.join(' ')}>
              {calendarView === ICalendarView.WEEK ? (
                <CalTaskInWeek
                  type={taskType}
                  time={time}
                  color={color}
                  title={title}
                  assigneeId={assigneeId}
                />
              ) : (
                <CalTaskInMonth
                  type={taskType}
                  time={time}
                  color={color}
                  title={title}
                  assigneeId={assigneeId}
                />
              )}
            </div>
          </div>
        )}
      </Draggable>
    </Link>
  )

  // if statusIds contain ALL or nothing
  // display view
  if (filterStatusIds.includes('ALL') || !filterStatusIds.length) {
    return view()
  }

  // if statusIds have some
  // display tasks that have the same status id
  if (filterStatusIds.includes(taskStatusId)) {
    return view()
  }

  return null
}
