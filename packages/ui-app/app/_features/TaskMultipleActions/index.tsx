import MemberPicker from '@/components/MemberPicker'
import PointSelect from '@/components/PointSelect'
import PrioritySelect from '@/components/PrioritySelect'
import StatusSelect from '@/components/StatusSelect'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { useUser } from '@goalie/nextjs'
import { TaskPriority } from '@prisma/client'
import { Button, DatePicker } from '@shared/ui'
import { useEffect, useState } from 'react'

const defaultData = {
  date: new Date(),
  point: '1',
  status: '',
  priority: TaskPriority.LOW,
  assignee: ''
}
export default function TaskMultipleActions() {
  const { statusDoneId } = useProjectStatusStore()
  const { user } = useUser()
  const { selected, clearAllSelected } = useTaskStore()
  const { updateMultiTaskData } = useServiceTaskUpdate()
  const [data, setData] = useState(
    structuredClone({ ...defaultData, status: statusDoneId })
  )
  const hasSelected = selected.length
  const { date, point, priority, assignee, status } = data

  const updateData = (
    name: keyof typeof data,
    val: string | Date | TaskPriority
  ) => {
    setData(dt => ({ ...dt, [name]: val }))
  }

  const onUpdate = () => {
    hasSelected &&
      updateMultiTaskData(selected, {
        dueDate: data.date,
        taskPoint: parseInt(data.point, 10),
        taskStatusId: data.status,
        priority: data.priority,
        assigneeIds: [data.assignee]
      })

    clearAllSelected()
  }

  // fill default user
  useEffect(() => {
    if (user) {
      updateData('assignee', user.id)
    }

    if (statusDoneId) {
      updateData('status', statusDoneId)
    }

    // eslint-disable-next-line
  }, [user?.id, statusDoneId])

  // // clear filled data
  // useEffect(() => {
  //   if (!hasSelected && user) {
  //     defaultData.assignee = user.id
  //     setData(defaultData)
  //   }
  // }, [hasSelected, user])

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && hasSelected) {
        clearAllSelected()
      }
    }

    document.addEventListener('keyup', handler)

    return () => {
      document.removeEventListener('keyup', handler)
      clearAllSelected()
    }

    // eslint-disable-next-line
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full py-3 border-b border-color-base bg-base shadow-lg shadow-color-base transition-all z-40 ${
        hasSelected ? '-translate-y-0' : '-translate-y-full'
      }`}>
      <div className="w-full flex items-center justify-center gap-2 text-sm">
        <span className="btn">Selected: {selected.length}</span>
        <DatePicker
          value={date}
          onChange={val => {
            // setFilterValue('startDate', val)
            updateData('date', val)
          }}
        />

        <StatusSelect
          value={status}
          onChange={val => {
            updateData('status', val)
          }}
          className="w-[150px]"
        />

        <PointSelect
          value={point}
          onChange={val => {
            updateData('point', val)
          }}
        />

        <PrioritySelect
          width={130}
          value={priority}
          onChange={val => {
            updateData('priority', val)
          }}
        />

        <MemberPicker
          value={assignee}
          onChange={val => {
            updateData('assignee', val)
          }}
          className="task-filter-member-picker"
        />
        <Button title="Update" primary onClick={onUpdate} />
        <Button title="Close" onClick={() => clearAllSelected()} />
      </div>
    </div>
  )
}
