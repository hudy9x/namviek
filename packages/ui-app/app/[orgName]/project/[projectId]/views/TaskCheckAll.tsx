import useTaskFilterContext from '@/features/TaskFilter/useTaskFilterContext'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { Form } from '@shared/ui'
import { useEffect, useMemo, useState } from 'react'

export default function TaskCheckAll({ groupId }: { groupId: string }) {
  const [checked, setChecked] = useState(false)
  const { tasks, selected, taskLoading, toggleMultipleSelected } =
    useTaskStore()
  const { groupBy, isGroupbyStatus, isGroupbyAssignee, isGroupbyPriority } =
    useTaskFilterContext()
  const { statuses } = useProjectStatusStore()

  const taskIds = useMemo(() => {
    const ids: string[] = []
    const projectStatusIds = statuses.map(stt => stt.id)
    const getIdsByStatus = ({ statusId, taskId }: { statusId: string, taskId: string }) => {
      if (statusId === groupId) {
        ids.push(taskId)
        return
      }

      if (groupId === 'NONE' && !projectStatusIds.includes(statusId)) {
        ids.push(taskId)
        return
      }
    }

    tasks.forEach(task => {
      if (isGroupbyStatus) {
        getIdsByStatus({
          statusId: task.taskStatusId || '',
          taskId: task.id
        })
        return
      }

      if (isGroupbyAssignee) {
        if (task.assigneeIds.length && !task.assigneeIds.includes(groupId)) {
          return null
        }

        if (!task.assigneeIds.length && groupId !== 'NONE') {
          return null
        }
      }

      if (isGroupbyPriority && task.priority !== groupId) {
        return null
      }

      console.log(isGroupbyStatus, task.taskStatusId, groupId)
      ids.push(task.id)
    })

    return ids
  }, [groupBy, JSON.stringify(statuses), groupId, taskLoading, JSON.stringify(tasks)])

  const onChecked = (checked: boolean) => {
    console.log('taskids', taskIds)
    toggleMultipleSelected(checked, taskIds)
  }

  useEffect(() => {
    // uncheck/check if one of items uncheck
    if (!selected.length) {
      setChecked(false)
    }

    if (taskIds.length && selected.length) {
      const map = new Map()
      let counter = 0

      taskIds.forEach(t => {
        map.set(t, true)
      })

      selected.forEach(s => {
        if (map.has(s)) {
          counter++
        }
      })

      if (counter !== taskIds.length && checked) {
        console.log(1)
        setChecked(false)
      }

      if (counter === taskIds.length && !checked) {
        console.log(2)
        setChecked(true)
      }
    }
  }, [selected, JSON.stringify(tasks), checked])

  return (
    <Form.Checkbox
      checked={checked}
      onChange={val => {
        onChecked(val)
        setChecked(val)
      }}
    />
  )
}
