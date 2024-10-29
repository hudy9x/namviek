import { Form, ListItemValue } from "@shared/ui";
import { useCustomFieldStore } from "./store";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { TbNumber29Small, TbNumber9 } from "react-icons/tb";
import { RiDonutChartLine } from "react-icons/ri";
import { IoBatteryHalfOutline } from "react-icons/io5";

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

  // set default config to number field 
  useEffect(() => {
    setConfig({ format: options[0].id })
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

function NumberShownAs() {
  const { setConfig, data } = useCustomFieldStore()
  const shownAs = [
    { value: 'number', title: 'Number', icon: <TbNumber29Small /> },
    { value: 'bar', title: 'Bar', icon: <IoBatteryHalfOutline /> },
    { value: 'ring', title: 'Ring', icon: <RiDonutChartLine /> },
  ]
  const [selected, setSelected] = useState('number')

  useEffect(() => {
    setConfig({ shownAs: 'number' })
  }, [])

  return <div className="form-control">
    <label>Shown as</label>
    <div className="grid grid-cols-3 gap-2">
      {shownAs.map(item => {
        const active = item.value === selected ? 'ring-2 ring-indigo-400' : ''
        return <div key={item.value}
          onClick={() => {
            setConfig({ shownAs: item.value })
            setSelected(item.value)
          }}
          className={`dark:hover:bg-gray-800 cursor-pointer border rounded-md dark:border-gray-700 p-2 ${active}`}>
          {item.icon}
          <span>{item.title}</span>
        </div>
      })}
    </div>
  </div>
}

export default function CreateFieldNumber() {
  const { data, setData } = useCustomFieldStore()
  const { name, desc } = data

  return <div className="space-y-3">
    <Form.Input value={name || ''} onChange={ev => {
      setData({ name: ev.target.value })
    }} title="Field name" placeholder="Input your field name" required className="w-full" />

    <NumberFormat />
    <NumberShownAs />

    {/* <Form.Textarea placeholder="What does this field do ?" value={desc || ''} onChange={ev => { */}
    {/*   setData({ desc: ev.target.value }) */}
    {/* }} title="Description" className="w-full" /> */}
  </div>
}
