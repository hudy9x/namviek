import ListPreset from "@/components/ListPreset";
import { Button, Form } from "@shared/ui";
import { ISchedulerTriggerAtField, ISchedulerTriggerEveryField, useSchedulerContext } from "./context";
import { useState } from "react";

export default function TriggerEveryday() {
  const today = new Date()
  const [every, setEvery] = useState<ISchedulerTriggerEveryField>('day')
  const [at, setAt] = useState<ISchedulerTriggerAtField>({
    hour: today.getHours(),
    minute: today.getMinutes(),
    period: 'am'
  })
  const { setTrigger } = useSchedulerContext()
  const onOk = () => {

    setTrigger({
      every,
      at
    })
  }

  const hours = new Array(12).fill(1).map((v, i) => ({
    id: i + 1 + '',
    title: i + 1 + ''
  }))

  const minutes = new Array(60).fill(1).map((v, i) => ({
    id: i + '',
    title: i + ''
  }))

  return <div className="box-2">

    <div className="flex items-center gap-2">
      Every
      <ListPreset
        width={100}
        value={every}
        onChange={val => { setEvery(val as ISchedulerTriggerEveryField) }}
        options={[
          { id: 'day', title: 'Day' },
          { id: 'weekday', title: 'Week day' },
        ]} />
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
          options={hours} />
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
          options={minutes} />
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
            { id: 'pm', title: 'PM' },
          ]} />
      </div>

    </div>
    <Button title="OK" onClick={onOk} />
  </div>
}
