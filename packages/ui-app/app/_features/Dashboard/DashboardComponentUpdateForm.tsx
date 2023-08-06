import ListPreset from '@/components/ListPreset'
import MultiMemberPicker from '@/components/MultiMemberPicker'
// import OperatorSelect from '@/components/OperatorSelect'
// import PrioritySelect from '@/components/PrioritySelect'
import PrioritySelectMultiple from '@/components/PrioritySelectMultiple'
// import StatusSelect from '@/components/StatusSelect'
import StatusSelectMultiple from '@/components/StatusSelectMultiple'
import { dboardComponentCreate } from '@/services/dashboard'
import { DashboardComponentType } from '@prisma/client'
// import { TaskPriority } from '@prisma/client'
import { Button, Form, FormGroup } from '@shared/ui'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface IDashboardFormProps {
  title?: string
  type?: string
  icon?: string
  onBack?: () => void
}

export default function DashboardComponentUpdateForm({
  type = '',
  title,
  icon,
  onBack
}: IDashboardFormProps) {
  const { projectId } = useParams()
  const formik = useFormik({
    initialValues: {
      icon,
      title,
      type,
      assigneeIds: [],
      statusIds: [],
      priority: [],
      projectIds: [],
      date: '',
      fixed: false
    },
    onSubmit: values => {
      const mergedValues = { ...values, projectIds: [projectId] }
      console.log(mergedValues)
      const { title, icon, type, projectIds, statusIds, priority, fixed } =
        values
      const compType = type as DashboardComponentType

      if (!type) {
        return
      }

      dboardComponentCreate({
        dashboardId: '64c63e9ca7952f78aec87814',
        type: type as DashboardComponentType,
        title,
        config: {
          projectIds,
          statusIds,
          priority,
          icon,
          fixed
        }
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
          value={formik.values.date}
          onChange={val => {
            formik.setFieldValue('date', val)
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

        {/* <FormGroup title="Date"> */}
        {/* <ListPreset */}
        {/*   className="w-[300px]" */}
        {/*   options={[ */}
        {/*     { id: '=', title: 'In (=)' }, */}
        {/*     { id: '!=', title: 'Out of (!=)' }, */}
        {/*     { id: '>=', title: 'Greater than (>=)' }, */}
        {/*     { id: '>', title: 'Greater (>)' }, */}
        {/*     { id: '<', title: 'Less (<)' }, */}
        {/*     { id: '<=', title: 'Less than (<=)' } */}
        {/*   ]} */}
        {/* /> */}

        <ListPreset
          title="Date"
          className="w-full"
          value={formik.values.date}
          onChange={val => {
            formik.setFieldValue('date', val)
          }}
          options={[
            { id: 'today', title: 'Today' },
            { id: 'week', title: 'This week' },
            { id: 'month', title: 'This month' }
          ]}
        />
        {/* </FormGroup> */}

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
          <Button title="Submit" type="submit" primary />
        </div>
      </form>
    </div>
  )
}
