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
        <Form.Input
          placeholder="hour"
          value={at.hour + ''}
          onChange={ev => {

            setAt(prev => {
              return { ...prev, hour: +ev.target.value }
            })
          }}
          className="w-[60px]" />
        <span>:</span>
        <Form.Input
          value={at.minute + ''}
          onChange={ev => {
            setAt(prev => {
              return { ...prev, minute: +ev.target.value }
            })
          }}
          placeholder="min"
          className="w-[50px]" />
        <ListPreset
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
