import {
  Button,
  DatePicker,
  Form,
  messageError,
  messageSuccess,
  randomId
} from '@shared/ui'
import MemberPicker from '../../../_components/MemberPicker'
import PrioritySelect from '../../../_components/PrioritySelect'
import StatusSelect from '../../../_components/StatusSelect'
import { Task, TaskPriority, TaskStatus } from '@prisma/client'
import { useFormik } from 'formik'
import { validateTask } from '@shared/validation'
import { useParams } from 'next/navigation'
import { taskAdd } from '../../../../services/task'
import { useEffect, useState } from 'react'
import { useTaskStore } from '../../../../store/task'
import { useUser } from '@goalie/nextjs'
import { useProjectStatusStore } from 'packages/ui-app/store/status'

const defaultFormikValues = {
  title: '',
  assigneeIds: [],
  taskStatusId: '',
  priority: TaskPriority.LOW,
  dueDate: new Date(),
  desc: '<p>Tell me what this task about 🤡</p>'
}

export default function TaskForm({ onSuccess }: { onSuccess: () => void }) {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const { addOneTask, syncRemoteTaskById } = useTaskStore()
  const params = useParams()
  const { statuses } = useProjectStatusStore()
  const formik = useFormik({
    initialValues: defaultFormikValues,
    onSubmit: values => {
      if (loading) return
      console.log('loading', loading)

      setLoading(true)
      const mergedValues = { ...values, projectId: params.projectId }
      if (!Array.isArray(mergedValues.assigneeIds)) {
        mergedValues.assigneeIds = [mergedValues.assigneeIds]
      }
      console.log(mergedValues)

      const { error, errorArr } = validateTask(mergedValues)
      // console.log(values)
      // console.log(errorArr, data);
      if (error) {
        setLoading(false)
        console.error(errorArr)
        return
      }

      const randomId = `TASK-ID-RAND-${Date.now()}`

      addOneTask({
        ...mergedValues,
        ...{
          createdAt: new Date(),
          createdBy: user?.id,
          id: randomId
        }
      })

      // addOneTask(values)

      taskAdd(mergedValues)
        .then(res => {
          const { data, status } = res.data
          if (status !== 200) return

          syncRemoteTaskById(randomId, data as Task)
          messageSuccess('Synced success !')
        })
        .catch(err => {
          messageError('Create new task error')
          console.log(err)
        })
        .finally(() => {
          // setLoading(false)
        })

      onSuccess()
      formik.resetForm()
      setLoading(false)
    }
  })

  useEffect(() => {
    if (statuses.length) {
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
    <form
      onSubmit={formik.handleSubmit}
      className="task-form flex flex-col gap-6">
      <Form.Input
        title="Task name"
        name='title'
        value={formik.values.title}
        onChange={formik.handleChange}
        placeholder="Enter your task name here !"
      />
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
      <Form.TextEditor
        title="Description"
        value={formik.values.desc}
        onChange={v => {
          formik.setFieldValue('desc', v)
        }}
      />

      <Button
        type="submit"
        loading={loading}
        title="Create new task"
        primary
        block
      />
    </form>
  )
}
