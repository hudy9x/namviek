import { Button, DatePicker, Form, messageWarning } from '@shared/ui'
import MemberPicker from '../../../_components/MemberPicker'
import PrioritySelect from '../../../_components/PrioritySelect'
import StatusSelect from '../../../_components/StatusSelect'
import { TaskPriority, TaskStatus } from '@prisma/client'
import { useFormik } from 'formik'
import { validateTask } from '@shared/validation'
import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useProjectStatusStore } from 'packages/ui-app/store/status'
import FileUpload from '@/components/Files/FileUpload'

export const defaultFormikValues: ITaskDefaultValues = {
  title: '',
  assigneeIds: [],
  taskStatusId: '',
  priority: TaskPriority.LOW,
  dueDate: new Date(),
  progress: 0,
  desc: '<p>Tell me what this task about 🤡</p>'
}

export interface ITaskDefaultValues {
  title: string
  assigneeIds: string[]
  taskStatusId: string
  priority: TaskPriority
  dueDate: Date
  desc: string
  progress: number
}
interface ITaskFormProps {
  isUpdate?: boolean
  taskStatusId?: string
  dueDate?: Date
  defaultValue?: ITaskDefaultValues
  onSubmit: (v: ITaskDefaultValues) => void
}

export default function TaskForm({
  dueDate,
  isUpdate = false,
  taskStatusId,
  onSubmit,
  defaultValue = defaultFormikValues
}: ITaskFormProps) {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { statuses } = useProjectStatusStore()
  const refDefaultValue = useRef<ITaskDefaultValues>(defaultValue)

  if (dueDate) {
    refDefaultValue.current = { ...refDefaultValue.current, dueDate }
  }

  if (taskStatusId) {
    refDefaultValue.current = { ...refDefaultValue.current, taskStatusId }
  }

  const formik = useFormik({
    initialValues: refDefaultValue.current,
    onSubmit: values => {
      if (loading) {
        messageWarning('Server is processing')
        return
      }

      setLoading(true)
      const mergedValues = { ...values, projectId: params.projectId }
      if (!Array.isArray(mergedValues.assigneeIds)) {
        mergedValues.assigneeIds = [mergedValues.assigneeIds]
      }

      const { error, errorArr } = validateTask(mergedValues)
      if (error) {
        setLoading(false)
        console.error(errorArr)
        return
      }

      onSubmit(mergedValues)
    }
  })

  // select a default status if empty
  useEffect(() => {
    if (statuses.length && !formik.values.taskStatusId) {
      let min: TaskStatus | null = null
      statuses.forEach(stt => {
        if (!min) {
          min = stt
          return
        }

        if (min.order > stt.order) {
          min = stt
        }
      })

      if (min) {
        const status = min as TaskStatus
        formik.setFieldValue('taskStatusId', status.id)
      }
    }
  }, [statuses])

  return (
    <form onSubmit={formik.handleSubmit} className="task-form space-y-3 gap-6">
      <div className="flex items-start gap-3">
        <div className="task-form-detail space-y-3 w-full">
          <Form.Input
            title="Task name"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Enter your task name here !"
          />
          <Form.TextEditor
            title="Description"
            value={formik.values.desc}
            onChange={v => {
              formik.setFieldValue('desc', v)
            }}
          />
          {isUpdate ? <FileUpload /> : null}
        </div>
        <div className="task-form-right-actions space-y-3 w-[200px] shrink-0">
          <MemberPicker
            title="Assignees"
            value={formik.values.assigneeIds[0]}
            onChange={val => {
              console.log('assignee:', val)
              formik.setFieldValue('assigneeIds', val)
            }}
          />
          <StatusSelect
            title="Status"
            value={formik.values.taskStatusId}
            onChange={val => {
              formik.setFieldValue('taskStatusId', val)
              console.log('status', val)
            }}
          />

          <PrioritySelect
            title="Priority"
            value={formik.values.priority}
            onChange={val => {
              formik.setFieldValue('priority', val)
              console.log('alo', val)
            }}
          />
          <DatePicker
            title="Due date"
            value={formik.values.dueDate}
            onChange={d => {
              formik.setFieldValue('dueDate', d)
            }}
          />
          <Form.Range
            title="Progress"
            step={5}
            value={formik.values.progress}
            onChange={v => {
              formik.setFieldValue('progress', v)
            }}
          />
        </div>
      </div>

      {/* <Button type="submit" loading={loading} title="Submit" primary block /> */}
    </form>
  )
}
