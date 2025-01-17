import { Form, ListItemValue } from "@ui-components";
import { useCustomFieldStore } from "./store";
import { useEffect, useMemo, useState } from "react";
import { Prisma } from "@prisma/client";

const List = Form.List

const options: ListItemValue[] = [
  { id: 'dd/MM/yyyy', title: 'European (20/03/2020)' },
  { id: 'MM/dd/yyyy', title: 'US (03/20/2020)' },
  { id: 'yyyy-MM-dd', title: 'ISO (2020-03-20)' },
  { id: 'from-now', title: 'Time from now (2 days ago)' },
  { id: 'ccc, LLL dd, yyyy', title: 'Thu, Aug 16, 2018' },
  {
    id: 'LLL dd, yyyy', title: 'Aug 16, 2018'
  },
]

function DateFormat() {

  const { setConfig, data } = useCustomFieldStore()
  const configData = data.config as Prisma.JsonObject

  const defaultSelected = useMemo(() => {
    const found = options.find(opt => opt.id === configData?.format)
    return found || options[0]
  }, [configData])
  const [counter, setCounter] = useState(0)
  const [selected, setSelected] = useState<ListItemValue>(defaultSelected)

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


  return <List title="Date format"
    value={selected}
    onChange={(val: ListItemValue) => {
      setSelected(val)
      setCounter(counter => counter + 1)
    }}>
    <List.Button>{selected.title}</List.Button>
    <List.Options width={300}>
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

  console.log('include time', defaultConfig)

  if (defaultConfig && defaultConfig.includeTime) {
    checked = true
  }

  useEffect(() => {
    if (!data.id) {
      setConfig({ includeTime: false })
    }
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
