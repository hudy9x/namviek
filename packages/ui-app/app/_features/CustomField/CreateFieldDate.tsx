import { Form, ListItemValue } from "@shared/ui";
import { useCustomFieldStore } from "./store";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

const List = Form.List

const options: ListItemValue[] = [
  { id: 'DD/MM/YYYY', title: 'European (20/03/2020)' },
  { id: 'MM/DD/YYYY', title: 'US (03/20/2020)' },
  { id: 'YYYY-MM-DD', title: 'ISO (2020-03-20)' },
]

function DateFormat() {

  const { setConfig, data } = useCustomFieldStore()
  const [counter, setCounter] = useState(0)
  const [selected, setSelected] = useState<ListItemValue>(options[0])
  const configData = data.config as Prisma.JsonObject

  useEffect(() => {
    if (counter <= 0) {
      return
    }

    setConfig({ format: selected.id })

  }, [counter])

  useEffect(() => {
    if (counter === 0) {
      setConfig({ format: options[0].id })
    }
  }, [])


  let opt: ListItemValue | undefined = options[0]
  if (configData) {
    opt = options.find(opt => opt.id === configData.format)
  }

  return <List title="Date format"
    value={opt || options[0]}
    onChange={val => {
      setSelected(val)
      setCounter(counter => counter + 1)
    }}>
    <List.Button>{selected.title}</List.Button>
    <List.Options>
      {options.map(option => {
        return <List.Item key={option.id} value={option}>{option.title}</List.Item>
      })}
    </List.Options>
  </List>
}

function IncludeTime() {
  const { data, setConfig } = useCustomFieldStore()
  const defaultConfig = data.config as Prisma.JsonObject
  let checked = false

  if (defaultConfig && defaultConfig.includeTime) {
    checked = true
  }

  useEffect(() => {
    setConfig({ includeTime: false })
  }, [])

  return <Form.Checkbox checked={checked} onChange={val => {
    console.log(val)
    setConfig({ includeTime: val })
  }} title="Include time" />
}


export default function CreateFieldDate() {
  const { data, setData } = useCustomFieldStore()
  const { name } = data

  return <div className="space-y-3">
    <Form.Input value={name || ''} onChange={ev => {
      setData({ name: ev.target.value })
    }} title="Field name" placeholder="Input your field name" required className="w-full" />

    <DateFormat />
    <IncludeTime />

  </div>
}
