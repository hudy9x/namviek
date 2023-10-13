import ListPreset from '@/components/ListPreset'
import MultiMemberPicker from '@/components/MultiMemberPicker'
import PrioritySelectMultiple from '@/components/PrioritySelectMultiple'
import StatusSelectMultiple from '@/components/StatusSelectMultiple'
import { DashboardComponentType } from '@prisma/client'
import { Button, Form, FormGroup } from '@shared/ui'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import DboardCompColumnUpdateForm from './DboardCompColumnUpdateForm'
import { useDboardComponentSubmit } from './useDboardComponentSubmit'

interface IDashboardFormProps {
  title?: string
  type?: DashboardComponentType
  icon?: string
  onBack?: () => void
  onCloseModal?: () => void
}

export default function DashboardComponentUpdateForm({
  type = DashboardComponentType.SUMMARY,
  title,
  icon,
  onBack,
  onCloseModal
}: IDashboardFormProps) {
  const { formik, sending } = useDboardComponentSubmit({
    title,
    icon,
    type,
    onSuccess: () => {
      onCloseModal && onCloseModal()
    }
  })

  const isBurnChart =
    formik.values.type === DashboardComponentType.BURNDOWN ||
    formik.values.type === DashboardComponentType.BURNUP
  console.log(isBurnChart, '----> isBurnChart')
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

        {isBurnChart ? null : (
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
              {
                id: DashboardComponentType.PIE,
                disabled: true,
                title: '🍩 Pie'
              }
            ]}
          />
        )}

        {formik.values.type === DashboardComponentType.COLUMN ? (
          <DboardCompColumnUpdateForm formik={formik} />
        ) : null}

        <MultiMemberPicker
          title="Assignees"
          value={formik.values.assigneeIds}
          onChange={val => {
            formik.setFieldValue('assigneeIds', val)
          }}
        />

        {isBurnChart ? null : (
          <>
            <StatusSelectMultiple
              title="Status"
              value={formik.values.statusIds}
              onChange={val => {
                formik.setFieldValue('statusIds', val)
              }}
            />
          </>
        )}

        {/* <FormGroup title="Priority"> */}
        {/* <ListPreset */}
        {/*   className="w-[140px]" */}
        {/*   options={[ */}
        {/*     { id: 'IN', title: 'In' }, */}
        {/*     { id: 'NOT_IN', title: 'Not in' } */}
        {/*   ]} */}
        {/* /> */}

        {isBurnChart ? (
          <ListPreset
            title="Date"
            className="w-full"
            defaultOption={{ id: '', title: '📆' }}
            value={formik.values.date[1]}
            onChange={val => {
              const date = [...formik.values.date]
              date[1] = val
              formik.setFieldValue('date', date)
            }}
            options={[
              { id: 'week', title: 'This week' },
              { id: 'month', title: 'This month' }
            ]}
          />
        ) : (
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
        )}

        {/* </FormGroup> */}

        {isBurnChart ? null : (
          <>
            <>
              <FormGroup
                title="Date"
                helper="If one of them selected, the other must be selected">
                <ListPreset
                  defaultOption={{ id: '', title: '➗' }}
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
                  defaultOption={{ id: '', title: '📆' }}
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
            </>
          </>
        )}

        <div className="flex items-center justify-end gap-3">
          <Button title="Cancel" onClick={onBack} />
          <Button title="Submit" loading={sending} type="submit" primary />
        </div>
      </form>
    </div>
  )
}
