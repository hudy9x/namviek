import { Form } from '@shared/ui'
import { WHEN, useAutomateContext } from './context'
import StatusSelect from '@/components/StatusSelect'
import PrioritySelect from '@/components/PrioritySelect'
import { TaskPriority } from '@prisma/client'

export default function AutomateWhenValues() {
  const { when, setWhenField } = useAutomateContext()
  const isStatusChanged = when.is === WHEN.STATUS_CHANGED
  const isPriorityChanged = when.is === WHEN.PRIORITY_CHANGED
  return (
    <>
      <div className="mt-2">
        {when.is === WHEN.PROGRESS_CHANGED ? (
          <Form.Range
            title={`From any value to`}
            maxValue={100}
            step={5}
            value={parseInt(when.valueTo + '' || '0')}
            onChange={val => {
              setWhenField('valueTo', val + '')
            }}
          />
        ) : null}

        {isStatusChanged ? (
          <div className="space-y-3 mt-2">
            {/* <StatusSelect title="From" /> */}
            <StatusSelect
              title="To"
              value={when.valueTo}
              onChange={val => {
                setWhenField('valueTo', val)
              }}
            />
          </div>
        ) : null}

        {isPriorityChanged ? (
          <div className="space-y-3 mt-2">
            {/* <PrioritySelect title="From" value="ALL" /> */}
            <PrioritySelect
              title="To"
              value={(when.valueTo || 'ALL') as TaskPriority}
              onChange={val => {
                setWhenField('valueTo', val)
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}
