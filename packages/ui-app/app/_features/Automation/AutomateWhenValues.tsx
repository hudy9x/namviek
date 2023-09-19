import { Form } from '@shared/ui'
import { WHEN, useAutomateContext } from './context'

export default function AutomateWhenValues() {
  const { when, setWhenField } = useAutomateContext()
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
      </div>
    </>
  )
}
