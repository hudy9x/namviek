import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import { useTaskStore } from '@/store/task'
import { Task, TaskPriority, TaskType } from '@prisma/client'
import { useState } from 'react'

export const defaultData = {
  date: undefined,
  point: '',
  status: '',
  type: 'NONE' as TaskType,
  priority: 'NONE' as TaskPriority,
  assignee: ''
}

export const useMultipleUpdate = () => {
  const { selected, clearAllSelected } = useTaskStore()
  const { updateMultiTaskData } = useServiceTaskUpdate()
  const [data, setData] = useState(structuredClone({ ...defaultData }))
  const hasSelected = selected.length

  const onUpdate = () => {
    const dt: Partial<Task> = {}
    const { date, point, status, priority, assignee, type } = data

    if (date) {
      dt.dueDate = date
    }

    if (point) {
      dt.taskPoint = parseInt(point, 10)
    }

    if (!priority.includes('NONE')) {
      dt.priority = priority
    }

    if (!type.includes('NONE')) {
      dt.type = type
    }

    if (status) {
      dt.taskStatusId = status
    }

    if (assignee) {
      dt.assigneeIds = [assignee]
    }

    console.log(data)

    if (Object.keys(dt).length) {
      console.log('updated', dt)
      hasSelected && updateMultiTaskData(selected, dt)
    } else {
      console.log('nothing to update')
    }

    clearAllSelected()
    setData(structuredClone({ ...defaultData }))
  }

  return {
    data,
    setData,
    onUpdate,
    hasSelected,
    clearAllSelected,
    selected
  }
}
