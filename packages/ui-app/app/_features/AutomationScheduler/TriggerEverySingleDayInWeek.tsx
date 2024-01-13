import ListPreset from '@/components/ListPreset'
import { Button, Form } from '@shared/ui'
import { useState } from 'react'
import {
  ISchedulerTriggerAtField,
  ISchedulerTriggerEveryField,
  useSchedulerContext
} from './context'

export default function TriggerEverySingleDayInWeek() {
  const today = new Date()
  const [every, setEvery] = useState<ISchedulerTriggerEveryField>('mon')
  const [at, setAt] = useState<ISchedulerTriggerAtField>({
    hour: today.getHours(),
    minute: today.getMinutes(),
    period: 'am'
  })
  const { setTrigger } = useSchedulerContext()
  const onOk = () => {
    setTrigger({ every, at })
  }

  const hours = new Array(13).fill(1).map((v, i) => ({
    id: i + '',
    title: i + ''
  }))

  const minutes = new Array(60).fill(1).map((v, i) => ({
    id: i + '',
    title: i + ''
  }))

  return (
    <div className="box-2">
      <div className="flex items-center gap-2">
        Every
        <ListPreset
          width={180}
          className="no-clear-icon"
          value={every}
          onChange={val => {
            setEvery(val as ISchedulerTriggerEveryField)
          }}
          options={[
            { id: 'mon', title: 'Monday' },
            { id: 'tue', title: 'Tuesday' },
            { id: 'wed', title: 'Wednesday' },
            { id: 'thu', title: 'Thursday' },
            { id: 'fri', title: 'Friday' },
            { id: 'sat', title: 'Saturday' },
            { id: 'sun', title: 'Sunday' }
          ]}
        />
        at
        <div className="inline-flex gap-1 items-center">
          <ListPreset
            className="no-clear-icon"
            width={100}
            value={(at.hour > 12 ? at.hour - 12 : at.hour) + ''}
            onChange={val => {
              setAt(prev => {
                return { ...prev, hour: parseInt(val, 10) }
              })
            }}
            options={hours}
          />
          <span>:</span>
          <ListPreset
            className="no-clear-icon"
            width={100}
            value={at.minute + ''}
            onChange={val => {
              setAt(prev => {
                return { ...prev, minute: parseInt(val, 10) }
              })
            }}
            options={minutes}
          />
          <ListPreset
            className="no-clear-icon"
            value={at.period}
            onChange={val => {
              setAt(prev => {
                return { ...prev, period: val as 'am' | 'pm' }
              })
            }}
            options={[
              { id: 'am', title: 'AM' },
              { id: 'pm', title: 'PM' }
            ]}
          />
        </div>
      </div>
      <Button title="OK" onClick={onOk} />
    </div>
  )
}
