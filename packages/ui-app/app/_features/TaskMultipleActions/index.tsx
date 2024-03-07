import MemberPicker from '@/components/MemberPicker'
import PointSelect from '@/components/PointSelect'
import PrioritySelect from '@/components/PrioritySelect'
import StatusSelect from '@/components/StatusSelect'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { useUser } from '@goalie/nextjs'
import { Task, TaskPriority } from '@prisma/client'
import { Button, DatePicker } from '@shared/ui'
import { useCallback, useEffect, useState } from 'react'

const defaultData = {
  date: undefined,
  point: '',
  status: '',
  priority: 'NONE' as TaskPriority,
  assignee: ''
}
export default function TaskMultipleActions() {
  const { statusDoneId } = useProjectStatusStore()
  const { user } = useUser()
  const { selected, clearAllSelected } = useTaskStore()
  const { updateMultiTaskData } = useServiceTaskUpdate()
  const [data, setData] = useState(structuredClone({ ...defaultData }))
  const hasSelected = selected.length
  const { date, point, priority, assignee, status } = data

  const updateData = (
    name: keyof typeof data,
    val: string | Date | TaskPriority
  ) => {
    setData(dt => ({ ...dt, [name]: val }))
  }

  const onUpdate = () => {
    const dt: Partial<Task> = {}
    const { date, point, status, priority, assignee } = data

    if (date) {
      dt.dueDate = date
    }

    if (point) {
      dt.taskPoint = parseInt(point, 10)
    }

    if (!priority.includes('NONE')) {
      dt.priority = priority
    }

    if (status) {
      dt.taskStatusId = status
    }

    if (assignee) {
      dt.assigneeIds = [assignee]
    }

    if (Object.keys(dt).length) {
      console.log('updated', dt)
      hasSelected && updateMultiTaskData(selected, dt)
    } else {
      console.log('nothing to update')
    }

    clearAllSelected()
    setData(structuredClone({ ...defaultData }))
  }

  // fill default user
  useEffect(() => {
    if (user) {
      // updateData('assignee', user.id)
    }

    if (statusDoneId) {
      // updateData('status', statusDoneId)
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
      if (ev.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keyup', handler)

    return () => {
      document.removeEventListener('keyup', handler)
      onClose()
    }

    // eslint-disable-next-line
  }, [])

  const onClose = () => {
    clearAllSelected()
    setData(structuredClone({ ...defaultData }))
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full py-3 border-b border-color-base bg-base shadow-lg transition-all z-40 ${
        hasSelected
          ? '-translate-y-0 shadow-color-base'
          : '-translate-y-full shadow-transparent'
      }`}>
      <div className="w-full grid grid-cols-2 px-4 sm:flex sm:items-center justify-center gap-2 text-sm">
        <span className="btn">Selected: {selected.length}</span>
        <DatePicker
          value={date}
          placeholder="--/--/--"
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
          className="sm:w-[150px]"
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
        <Button title="Close" onClick={onClose} />
      </div>
    </div>
  )
}
