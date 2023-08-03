import PrioritySelect from '@/components/PrioritySelect'
import StatusSelect from '@/components/StatusSelect'
import StatusSelectMultiple from '@/components/StatusSelectMultiple'
import { useFormik } from 'formik'

export default function DashboardComponentUpdateForm() {
  const formik = useFormik({
    initialValues: {
      assigneeIds: [],
      statusIds: ['64a2742810848bf6cbdd6e7b', '64a2742810848bf6cbdd6e7c'],
      projectIds: [],
      icon: '',
      title: ''
    },
    onSubmit: values => {
      console.log(values)
    }
  })
  return (
    <div>
      <form>
        <StatusSelectMultiple
          title="Status"
          value={formik.values.statusIds}
          onChange={val => {
            console.log('user select status')
            console.log(val)
          }}
        />
      </form>
    </div>
  )
}
