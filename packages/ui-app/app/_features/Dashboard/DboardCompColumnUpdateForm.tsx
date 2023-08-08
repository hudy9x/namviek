import ListPreset from '@/components/ListPreset'
import { DashboardComponentType, TaskPriority } from '@prisma/client'
import { FormikProps } from 'formik'
import { IDboardComponentFields } from './DashboardComponentUpdateForm'

export default function DboardCompColumnUpdateForm({
  formik
}: {
  formik: FormikProps<IDboardComponentFields>
}) {
  return (
    <>
      <ListPreset
        title="X axis"
        className="w-full"
        value={formik.values.type}
        error={formik.errors.xAxis}
        
        onChange={val => {
          formik.setFieldValue('xAxis', val)
        }}
        options={[{ id: 'ASSIGNEE', title: '🧑 Assignee' }]}
      />
      <ListPreset
        title="Series"
        error={formik.errors.series}
        className="w-full"
        value={formik.values.type}
        onChange={val => {
          formik.setFieldValue('series', val)
        }}
        options={[
          { id: 'STATUS', title: '🍉 Status' },
          { id: 'POINT', disabled: true, title: '🎯 Point' },
          { id: 'PRIORITY', disabled: true, title: '🚦 Priority' }
        ]}
      />
    </>
  )
}
