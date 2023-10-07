import ListPreset from '@/components/ListPreset'
import { useAutomateContext, whenOptions } from './context'
import AutomateWhenValues from './AutomateWhenValues'

export default function AutomateWhen() {
  const { when, setWhenField, setWhen } = useAutomateContext()

  return (
    <div className="when">
      <div className="box flex items-center gap-3 ">
        <img
          className="w-10 h-10 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 bg-gray-50"
          src={
            'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f991.png'
          }
        />
        <div className="text-sm ">
          <h2 className="font-medium">When</h2>
          <p className="text-xs flex items-center gap-1">
            This happens
            <ListPreset
              className="w-[150px] when-select"
              value={when.happens}
              onChange={val => {
                setWhenField('happens', val)
              }}
              width={180}
              options={[
                { id: 'task', title: 'On a task' },
                { id: 'subtask', title: 'On a subtask' },
                { id: 'both', title: 'On tasks or subtasks' }
              ]}
            />
          </p>
        </div>
      </div>

      <div className="box box-connector">
        <ListPreset
          className="w-full"
          value={when.is}
          onChange={val => {
            setWhen(prev => ({
              ...prev,
              is: val,
              valueTo: '',
              valueFrom: '',
              equal: ''
            }))
          }}
          width={180}
          options={whenOptions}
        />

        <AutomateWhenValues />
      </div>
    </div>
  )
}
