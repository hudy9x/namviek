import { Task } from '@prisma/client'
import TaskAssignee from '../views/TaskAssignee'
import { Draggable } from 'react-beautiful-dnd'
import { useStatusData } from '@/hooks/useStatusData'
import CalTaskInMonth from './CalTaskInMonth'
import { ICalendarView, useCalendarContext } from './context'
import CalTaskInWeek from './CalTaskInWeek'
import { useTaskFilter } from '@/features/TaskFilter/context'
import Link from 'next/link'

interface ICalMonthTaskProps {
  id: string
  link: string
  title: string
  time: string
  assigneeId: string
  taskStatusId: string
  index: number
}

export default function CalMonthTask({
  index,
  link,
  time,
  id,
  title,
  assigneeId,
  taskStatusId
}: ICalMonthTaskProps) {
  const { filter } = useTaskFilter()
  const { status: filterStatus } = filter
  const { color, type } = useStatusData(taskStatusId || '')
  const { calendarView } = useCalendarContext()

  if (filterStatus !== 'ALL' && filterStatus !== type) {
    return null
  }

  return (
    <Link href={link}>
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="calendar-task-item relative">
            {calendarView === ICalendarView.WEEK ? (
              <CalTaskInWeek
                color={color}
                title={title}
                assigneeId={assigneeId}
              />
            ) : (
              <CalTaskInMonth
                time={time}
                color={color}
                title={title}
                assigneeId={assigneeId}
              />
            )}
          </div>
        )}
      </Draggable>
    </Link>
  )
}
