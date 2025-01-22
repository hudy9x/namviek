import ListPreset from '@/components/ListPreset'
import { thenOptions, useAutomateContext } from './context'
import AutomateThenValues from './AutomateThenValues'

export default function AutomateThen() {
  const { then, setThenField, setThen } = useAutomateContext()
  return (
    <div className="then">
      <div className="box flex items-center gap-3 ">
        <img
          className="w-10 h-10 p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          src={
            'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f958.png'
          }
        />
        <div className="text-sm ">
          <h2 className="font-medium">Then...</h2>
          <p className="text-xs flex items-center gap-1">Do this action</p>
        </div>
      </div>

      <div className="box box-connector">
        <ListPreset
          className="w-full"
          value={then.change}
          onChange={val => {
            console.log(val)

            setThen(prev => ({
              ...prev,
              ...{
                change: val,
                value: ''
              }
            }))
          }}
          width={180}
          options={thenOptions}
        />
        <AutomateThenValues />
      </div>
    </div>
  )
}
