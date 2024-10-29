import { Form, ListItemValue } from "@shared/ui";
import { useCustomFieldStore } from "./store";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

const List = Form.List
const options: ListItemValue[] = [
  { id: 'number', title: 'Number' },
  { id: 'number-with-commas', title: 'Number with commas' },
  { id: 'percent', title: 'Percent' },
  { id: 'us-dollar', title: 'US Dollar' },
  { id: 'vietnam-dong', title: 'Vietnam Dong' },
]

function NumberFormat() {
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
  return <List title="Number format"
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

export default function CreateFieldNumber() {
  const { data, setData } = useCustomFieldStore()
  const { name, desc } = data

  return <div className="space-y-3">
    <Form.Input value={name || ''} onChange={ev => {
      setData({ name: ev.target.value })
    }} title="Field name" placeholder="Input your field name" required className="w-full" />

    <NumberFormat />

    {/* <Form.Textarea placeholder="What does this field do ?" value={desc || ''} onChange={ev => { */}
    {/*   setData({ desc: ev.target.value }) */}
    {/* }} title="Description" className="w-full" /> */}
  </div>
}
