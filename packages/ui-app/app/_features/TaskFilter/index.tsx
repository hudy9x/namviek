import ListPreset from '@/components/ListPreset'
import MultiMemberPicker from '@/components/MultiMemberPicker'
import PointSelect from '@/components/PointSelect'
import TaskImport from '@/features/TaskImport'
import { DatePicker } from '@shared/ui'
import './style.css'
import PrioritySelect from '@/components/PrioritySelect'
import FormGroup from 'packages/shared-ui/src/components/FormGroup'
import { useFormik } from 'formik'

export default function TaskFilter() {
  const formik = useFormik({
    initialValues: {
      dateOperator: '=',
      date: 'this-month',
      startDate: null,
      endDate: null,
      point: null,
      priority: 'ALL',
      assigneeIds: []
    },
    onSubmit: values => {
      console.log(values)
    }
  })

  return (
    <div className="task-filter">
      <div>
        <input className="text-sm outline-none" placeholder="Search ..." />
      </div>

      <div className="task-filter-actions">
        <FormGroup>
          <ListPreset
            value="="
            className="w-[70px]"
            width={70}
            options={[
              { id: '=', title: '=' },
              { id: '>', title: '>' },
              { id: '<', title: '<' }
            ]}
          />
          <ListPreset
            className="w-[150px]"
            width={150}
            value="this-month"
            options={[
              { id: 'today', title: 'Today' },
              { id: 'yesterday', title: 'Yesterday' },
              { id: 'tomorrow', title: 'Tomorrow' },
              { id: 'this-week', title: 'This week' },
              { id: 'this-month', title: 'This month' },
              { id: 'not-set', title: 'Not set' },
              { id: 'date-range', title: 'Date range' }
            ]}
          />
        </FormGroup>
        <DatePicker value={new Date()} />
        <DatePicker value={new Date()} />
        <PointSelect value="INFINITE" zero={true} infinite={true} />
        <PrioritySelect all={true} value="ALL" />
        <MultiMemberPicker
          compact={true}
          className="task-filter-member-picker"
        />
        <TaskImport />
      </div>
    </div>
  )
}
