import MemberPicker from '@/components/MemberPicker'
import OrganizationSelect from '@/components/OrganizationSelect'
import ProjectSelect from '@/components/ProjectSelect'
import {
  Button,
  DatePicker,
  Form,
  messageError,
  messageWarning
} from '@shared/ui'
import { validateVision } from '@shared/validation'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'

export const defaultFormikValues: ITaskDefaultValues = {
  title: '',
  assigneeIds: [],
  orgId: '',
  projectId: '',
  dueDate: new Date(),
  progress: 0,
  desc: 'Tell me what this vision about 👁️'
}

export interface ITaskDefaultValues {
  title: string
  assigneeIds: string[]
  orgId: string
  projectId: string
  dueDate: Date
  desc: string
  progress: number
}
interface ITaskFormProps {
  orgId?: string
  projectId?: string
  dueDate?: Date
  defaultValue?: ITaskDefaultValues
  onSubmit: (v: ITaskDefaultValues) => void
}

export default function VisionForm({
  dueDate,
  onSubmit,
  defaultValue = defaultFormikValues
}: ITaskFormProps) {
  const [loading, setLoading] = useState(false)
  const refDefaultValue = useRef<ITaskDefaultValues>(defaultValue)

  if (dueDate) {
    refDefaultValue.current = { ...refDefaultValue.current, dueDate }
  }

  const formik = useFormik({
    initialValues: refDefaultValue.current,
    onSubmit: values => {
      if (loading) {
        messageWarning('Server is processing')
        return
      }

      setLoading(true)
      if (!Array.isArray(values.assigneeIds)) {
        values.assigneeIds = [values.assigneeIds]
      }

      const { error, errorArr } = validateVision(values)
      if (error) {
        setLoading(false)
        console.error(errorArr)
        Object.values(errorArr).forEach(err => {
          messageError(err)
        })
        return
      }

      onSubmit(values)
    }
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 task-form">
      <Form.Input
        title="Vision name"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        placeholder="Enter your vision's name here !"
      />
      <MemberPicker
        title="Assignees"
        value={formik.values.assigneeIds[0]}
        onChange={val => {
          console.log('assignee:', val)
          formik.setFieldValue('assigneeIds', val)
        }}
      />
      <OrganizationSelect
        title="Organization"
        value={formik.values.orgId}
        onChange={val => {
          formik.setFieldValue('orgId', val)
          console.log('orgId', val)
        }}
      />

      <ProjectSelect
        title="Project"
        value={formik.values.projectId}
        onChange={val => {
          formik.setFieldValue('projectId', val)
          console.log('projectId', val)
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
      <Form.Range
        title="Progress"
        step={5}
        value={formik.values.progress}
        onChange={v => {
          formik.setFieldValue('progress', v)
        }}
      />

      <Button type="submit" loading={loading} title="Submit" primary block />
    </form>
  )
}
