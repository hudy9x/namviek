import { Button, messageError, messageWarning } from '@shared/ui'
import { useTaskImport } from './context'
import { Task, TaskPriority } from '@prisma/client'
import { useMemberStore } from '@/store/member'
import { useProjectStatusStore } from '@/store/status'
import { Row } from 'read-excel-file'
import { useCallback, useState } from 'react'
import { useParams } from 'next/navigation'
import { taskAddMany, taskGetAll } from '@/services/task'
import { useTaskStore } from '@/store/task'

type ITaskWithoutId = Omit<Task, 'id'>

export default function TaskImportAction() {
  const [loading, setLoading] = useState(false)
  const { projectId } = useParams()
  const { members } = useMemberStore()
  const { statuses } = useProjectStatusStore()
  const { tasks, addAllTasks } = useTaskStore()
  const { rows, setRows, setVisible, setStep } = useTaskImport()

  const onUploadAnotherFile = () => {
    setRows([])
  }

  const toAssigneeIds = (assigneeNames: string | null) => {
    if (!assigneeNames) return []

    const assigneeNameArr = assigneeNames?.split(',').map(s => s.trim())
    const assigneeIds: string[] = []

    members.forEach(m => {
      if (m?.name && assigneeNameArr.includes(m.name.trim())) {
        assigneeIds.push(m.id)
      }
    })

    return assigneeIds
  }

  const toValidPriority = (priority: string | null): TaskPriority | null => {
    if (!priority) return null

    priority = priority.toUpperCase()

    if (priority && Object.keys(TaskPriority).includes(priority)) {
      return priority as TaskPriority
    }

    return null
  }

  const toValidStatusId = (status: string | null) => {
    if (!status) return null

    const stt = statuses.find(s => s.name.trim() === status.trim())

    if (!stt) return null

    return stt.id
  }

  const normalizeData = (data: Row[]) => {
    const newTasks: ITaskWithoutId[] = []
    data.forEach(row => {
      const [
        _projectId,
        _title,
        _assigneeIds,
        _dueDate,
        _priority,
        _taskPoint,
        _taskStatusId,
        ..._
      ] = row.map(cell => (cell ? String(cell) : null))

      // const projectId = _projectId
      const title = _title
      const assigneeIds = toAssigneeIds(_assigneeIds)
      const dueDate = _dueDate ? new Date(_dueDate) : null
      const priority = toValidPriority(_priority)
      const taskPoint = _taskPoint ? parseInt(_taskPoint, 10) : null
      const taskStatusId = toValidStatusId(_taskStatusId)

      if (title === null) {
        messageError('Task Name has to be string')
        setLoading(false)
        return
      }
      if (projectId === null) {
        messageError('Project ID has to be string')

        setLoading(false)
        return
      }

      const newTask: ITaskWithoutId = {
        title,
        desc: null,
        dueDate,
        startDate: null,
        projectId,
        priority,
        taskStatusId,
        tagIds: [],
        // member.name is not unique
        assigneeIds,
        progress: null,
        parentTaskId: null,
        taskPoint,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null
      }

      newTasks.push(newTask)
    })

    return newTasks
  }

  const nextStep = () => {
    setStep(step => step + 1)
  }

  const doImport = useCallback(() => {
    if (loading) {
      messageWarning('Import process running ! ✋')
      return
    }
    console.log('normalizing data')

    nextStep()
    setLoading(true)
    const tasks = normalizeData(rows)

    if (tasks.filter(task => !task).length > 0) {
      messageError('Check the uploading data again!')
      setLoading(false)
      return
    }

    if (!tasks || !tasks.length) {
      setLoading(false)
      return
    }

    nextStep()
    console.log('start importing')
    taskAddMany({ data: tasks, projectId })
      .then(res => {
        const { status, error } = res.data
        if (status !== 200) {
          messageError(error)
          return false
        }

        return true
      })
      .then(needToFetch => {
        return new Promise((resolve, reject) => {
          if (!needToFetch) return reject(0)

          nextStep()
          console.log('delay 2s before fetching data')
          setTimeout(() => {
            console.log('fetching task for updating')
            nextStep()
            taskGetAll(projectId).then(result => {
              const { data, status } = result.data
              nextStep()
              if (status !== 200) {
                messageWarning(
                  'Refetching data error, please reload app to update latest data'
                )
                reject(0)
                return
              }

              addAllTasks(data)
              setVisible(false)
              resolve(1)
            })
          }, 5000)
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [rows, loading, tasks])

  return (
    <div className="flex items-center justify-end mt-3">
      <div className="space-x-3">
        <Button
          title="Re-upload"
          disabled={loading}
          onClick={onUploadAnotherFile}
        />
        <Button title="Import" primary loading={loading} onClick={doImport} />
      </div>
    </div>
  )
}
