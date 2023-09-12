import MemberPicker from '@/components/MemberPicker'
import PrioritySelect from '@/components/PrioritySelect'
import StatusSelect from '@/components/StatusSelect'
import { useTaskStore } from '@/store/task'
import { Task, TaskPriority } from '@prisma/client'
import {
  Button,
  DatePicker,
  Form,
  messageError,
  messageSuccess,
  randomId
} from '@shared/ui'
import { validateTask } from '@shared/validation'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { defaultFormikValues } from './TaskForm'

interface ITaskFormProps {
  taskId: string
  onSuccess: () => void
}

export const TaskUpdateForm = ({
  taskId,
  onSuccess,
}: ITaskFormProps) => {

  const [loading, setLoading] = useState(false)
  const { tasks, updateTask } = useTaskStore()
  const params = useParams()
  
  const currentFormValues = useMemo(() => {
    const currentTask = tasks.find((task) => task.id === taskId)

    if (!currentTask) return

     return {
      title: currentTask.title,
      assigneeIds: currentTask.assigneeIds,
      desc: currentTask.desc,
      dueDate: currentTask.dueDate,
      priority: currentTask.priority,
      taskStatusId: currentTask.taskStatusId,
     }

     
  }, [taskId])
  
  const formik = useFormik({
    initialValues: currentFormValues || defaultFormikValues,
    onSubmit: values => {
      if (loading) return
      console.log('loading', loading)
      
      setLoading(true)

      console.log(values, ' ---> values')
      // const mergedValues = { ...values, projectId: params.projectId }
      // if (!Array.isArray(mergedValues.assigneeIds)) {
      //   mergedValues.assigneeIds = [mergedValues.assigneeIds]
      // }
      // console.log(mergedValues)

      // const { error, errorArr } = validateTask(mergedValues)
      // // console.log(values)
      // // console.log(errorArr, data);
      // if (error) {
      //   setLoading(false)
      //   console.error(errorArr)
      //   return
      // }

      updateTask({
        ...values,
        id: taskId,
      })


      onSuccess()
      formik.resetForm()
      setLoading(false)
    }
  })

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
        value={formik.values.taskStatusId || defaultFormikValues.taskStatusId}
        onChange={val => {
          formik.setFieldValue('taskStatusId', val)
          console.log('status', val)
        }}
      />

      <PrioritySelect
        title="Priority"
        value={formik.values.priority || defaultFormikValues.priority}
        onChange={val => {
          formik.setFieldValue('priority', val)
          console.log('alo', val)
        }}
      />
      <DatePicker
        title="Due date"
        value={formik.values.dueDate || defaultFormikValues.dueDate}
        onChange={d => {
          formik.setFieldValue('dueDate', d)
        }}
      />
      <Form.TextEditor
        title="Description"
        value={formik.values.desc || defaultFormikValues.desc}
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
