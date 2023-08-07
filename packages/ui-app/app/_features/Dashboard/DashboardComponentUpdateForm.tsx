import ListPreset from '@/components/ListPreset'
import MultiMemberPicker from '@/components/MultiMemberPicker'
// import OperatorSelect from '@/components/OperatorSelect'
// import PrioritySelect from '@/components/PrioritySelect'
import PrioritySelectMultiple from '@/components/PrioritySelectMultiple'
// import StatusSelect from '@/components/StatusSelect'
import StatusSelectMultiple from '@/components/StatusSelectMultiple'
import { dboardComponentCreate } from '@/services/dashboard'
import { DashboardComponentType, TaskPriority } from '@prisma/client'
// import { TaskPriority } from '@prisma/client'
import {
  Button,
  Form,
  FormGroup,
  messageError,
  messageWarning
} from '@shared/ui'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useOverviewContext } from '../Project/Overview/context'
import { useState } from 'react'

interface IDashboardFormProps {
  title?: string
  type?: DashboardComponentType
  icon?: string
  onBack?: () => void
  onCloseModal?: () => void
}

interface IDboardComponentFields {
  icon?: string
  title?: string
  type: DashboardComponentType
  assigneeIds: string[]
  statusIds: string[]
  priority: TaskPriority[]
  projectIds: string[]
  date: string[]
  fixed: boolean
}

const addOperator = (arr: string[] | TaskPriority[], operator: string) => {
  if (!arr.length) return arr
  return [operator, ...arr]
}

export default function DashboardComponentUpdateForm({
  type = DashboardComponentType.SUMMARY,
  title,
  icon,
  onBack,
  onCloseModal
}: IDashboardFormProps) {
  const [sending, setSending] = useState(false)
  const { dboardId, setComponents } = useOverviewContext()
  const { projectId } = useParams()
  const formik = useFormik<IDboardComponentFields>({
    initialValues: {
      icon,
      title,
      type,
      assigneeIds: [],
      statusIds: [],
      priority: [],
      projectIds: [],

      date: [],
      fixed: false
    },
    onSubmit: values => {
      if (sending) {
        messageWarning('Processing ...')
        return
      }

      if (!dboardId) {
        messageError('You have to create an overview dashboard first')
        return
      }

      const mergedValues = { ...values, projectIds: [projectId] }

      if (!mergedValues.type) {
        return
      }

      let { statusIds, projectIds, date, priority } = mergedValues

      statusIds = addOperator(statusIds, 'in')
      projectIds = addOperator(projectIds, 'in')
      priority = addOperator(priority, 'in') as TaskPriority[]

      if (date.length) {
        const dateLen = date.filter(Boolean).length
        if (dateLen < 2) {
          messageError('Please input both operator and date')
          return
        }
        if (date.length < 2) {
          date = ['=', ...date]
        }

        if (!date[0]) {
          date[0] = '='
        }
      }

      setSending(true)
      dboardComponentCreate({
        dashboardId: dboardId,
        type: type as DashboardComponentType,
        title,
        config: {
          projectIds,
          statusIds,
          priority,
          icon: mergedValues.icon,
          date,
          fixed: mergedValues.fixed
        }
      })
        .then(res => {
          const { status, data } = res.data
          if (status !== 200) {
            setSending(false)
            return
          }

          setComponents(prevComps => [...prevComps, data])
          onCloseModal && onCloseModal()
          setSending(false)
        })
        .catch(() => {
          setSending(false)
        })
    }
  })

  return (
    <div>
      <div className="flex items-center gap-2 mb-2 -mt-[3px]">
        <AiOutlineArrowLeft
          onClick={() => {
            onBack && onBack()
          }}
          className="w-9 h-9 p-2 text-gray-500 border rounded-md hover:bg-gray-50 cursor-pointer"
        />
        <span className="font-medium text-xl">Back</span>
      </div>
      <form className="space-y-4 mt-6" onSubmit={formik.handleSubmit}>
        <FormGroup title="Input chart's name">
          <Form.Input
            placeholder="Icon"
            className="w-[70px]"
            name="icon"
            value={formik.values.icon}
            onChange={formik.handleChange}
          />
          <Form.Input
            placeholder="Name"
            name="title"
            className="w-full"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <ListPreset
          title="Chart type"
          className="w-full"
          value={formik.values.type}
          onChange={val => {
            formik.setFieldValue('type', val)
          }}
          options={[
            { id: DashboardComponentType.SUMMARY, title: '➕ Summary' },
            { id: DashboardComponentType.COLUMN, title: '📊 Column' },
            { id: DashboardComponentType.PIE, title: '🍩 Pie' }
          ]}
        />
        <MultiMemberPicker
          title="Assignees"
          value={formik.values.assigneeIds}
          onChange={val => {
            formik.setFieldValue('assigneeIds', val)
          }}
        />

        <StatusSelectMultiple
          title="Status"
          value={formik.values.statusIds}
          onChange={val => {
            console.log('user select status')
            console.log(val)
            formik.setFieldValue('statusIds', val)
          }}
        />

        {/* <FormGroup title="Priority"> */}
        {/* <ListPreset */}
        {/*   className="w-[140px]" */}
        {/*   options={[ */}
        {/*     { id: 'IN', title: 'In' }, */}
        {/*     { id: 'NOT_IN', title: 'Not in' } */}
        {/*   ]} */}
        {/* /> */}

        <PrioritySelectMultiple
          title="Priority"
          className="w-full"
          value={formik.values.priority}
          onChange={val => {
            console.log('user select priority')
            console.log(val)
            formik.setFieldValue('priority', val)
          }}
        />
        {/* </FormGroup> */}

        <FormGroup title="Date">
          <ListPreset
            className="w-[300px]"
            value={formik.values.date[0]}
            onChange={val => {
              const date = [...formik.values.date]
              date[0] = val
              formik.setFieldValue('date', date)
            }}
            options={[
              { id: '=', title: 'In (=)' },
              { id: '>', title: 'Greater than (>)' },
              { id: '<', title: 'Less than (<)' }
            ]}
          />

          <ListPreset
            className="w-full"
            value={formik.values.date[1]}
            onChange={val => {
              const date = [...formik.values.date]
              date[1] = val
              formik.setFieldValue('date', date)
            }}
            options={[
              { id: 'today', title: 'Today' },
              { id: 'week', title: 'This week' },
              { id: 'month', title: 'This month' }
            ]}
          />
        </FormGroup>

        <Form.Checkbox
          checked={formik.values.fixed}
          onChange={val => {
            formik.setFieldValue('fixed', val)
          }}
          name="fixed"
          desc="Make this chart not be affected by input"
        />

        <div className="flex items-center justify-end gap-3">
          <Button title="Cancel" onClick={onBack} />
          <Button title="Submit" loading={sending} type="submit" primary />
        </div>
      </form>
    </div>
  )
}
