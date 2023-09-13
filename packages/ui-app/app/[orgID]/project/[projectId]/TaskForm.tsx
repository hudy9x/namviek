import {
  Button,
  DatePicker,
  Form,
  messageError,
  messageSuccess,
} from '@shared/ui'
import MemberPicker from '../../../_components/MemberPicker'
import PrioritySelect from '../../../_components/PrioritySelect'
import StatusSelect from '../../../_components/StatusSelect'
import { Task, TaskPriority, TaskStatus } from '@prisma/client'
import { useFormik } from 'formik'
import { validateTask } from '@shared/validation'
import { useParams } from 'next/navigation'
import { taskAdd, taskUpdate } from '../../../../services/task'
import { useEffect, useState } from 'react'
import { useTaskStore } from '../../../../store/task'
import { useUser } from '@goalie/nextjs'
import { useProjectStatusStore } from 'packages/ui-app/store/status'

export let defaultFormikValues: ITaskDefaultValues = {
  title: '',
  assigneeIds: [],
  taskStatusId: '',
  priority: TaskPriority.LOW,
  dueDate: new Date(),
  desc: '<p>Tell me what this task about 🤡</p>'
}

export enum TASK_MODE {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}

interface ITaskDefaultValues {
  title: string;
  assigneeIds: string[];
  taskStatusId: string;
  priority: TaskPriority;
  dueDate: Date;
  desc: string;
}
interface ITaskFormProps {
  taskStatusId?: string
  taskId?: string,
  mode: TASK_MODE,
  dueDate?: Date
  onSuccess: () => void
}

export default function TaskForm({
  dueDate,
  taskStatusId,
  taskId,
  mode,
  onSuccess
}: ITaskFormProps) {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const { addOneTask, syncRemoteTaskById, updateTask, tasks } = useTaskStore()
  const params = useParams()
  const { statuses } = useProjectStatusStore()

  if (dueDate) {
    defaultFormikValues = { ...defaultFormikValues, dueDate }
  }

  if (taskStatusId) {
    defaultFormikValues = { ...defaultFormikValues, taskStatusId }
  }

  let currentTask: Task | undefined
  if (taskId) {
    currentTask = tasks.find((task) => task.id === taskId)

    if (currentTask) {
      defaultFormikValues = {
        title: currentTask?.title || defaultFormikValues.title,
        taskStatusId: currentTask?.taskStatusId || defaultFormikValues.taskStatusId,
        priority: currentTask.priority ? currentTask.priority : defaultFormikValues.priority,
        dueDate: currentTask.dueDate ? new Date(currentTask.dueDate) : defaultFormikValues.dueDate,
        assigneeIds: currentTask.assigneeIds ? currentTask.assigneeIds : defaultFormikValues.assigneeIds,
        desc: currentTask.desc ? currentTask.desc : defaultFormikValues.desc
      }
    }
  }

  const handleTask = (mergedValues: ITaskDefaultValues) => {
    if (mode === TASK_MODE.CREATE) {
      const randomId = `TASK-ID-RAND-${Date.now()}`

      addOneTask({
        ...mergedValues,
        ...{
          createdAt: new Date(),
          createdBy: user?.id,
          id: randomId
        }
      })

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
    } else {
      updateTask({
        ...mergedValues,
        id: taskId,
        updatedBy: user?.id,
        updatedAt: new Date(),
      })

      taskUpdate(mergedValues).then((res) => {
        const { data, status } = res.data
        if (status !== 200) return

        syncRemoteTaskById(data.id, data as Task)
        messageSuccess('Synced success !')
      }).catch((err) => {
        messageError('Update new task error')

        if (!currentTask) return
        syncRemoteTaskById(currentTask?.id, currentTask)
        console.log(err)
      })
    }
  }

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
      console.log(values, ' --> value')
      console.log(mergedValues)

      const { error, errorArr } = validateTask(mergedValues)
      // console.log(values)
      // console.log(errorArr, data);
      if (error) {
        setLoading(false)
        console.error(errorArr)
        return
      }

      handleTask(mergedValues)
      onSuccess()
      formik.resetForm()
      setLoading(false)
    }
  })

  // select a default status if empty
  useEffect(() => {
    if (mode !== TASK_MODE.CREATE) return

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
    <form
      onSubmit={formik.handleSubmit}
      className="task-form flex flex-col gap-6">
      <Form.Input
        title="Task name"
        name="title"
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
        title={mode === TASK_MODE.CREATE ? "Create new task" : "Update new task"}
        primary
        block
      />
    </form>
  )
}
