import { Form, ListItemValue } from "@ui-components";
import { useCustomFieldStore } from "./store";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { TbNumber29Small } from "react-icons/tb";
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
  const configData = data.config as Prisma.JsonObject
  const [counter, setCounter] = useState(0)
  const [selected, setSelected] = useState<ListItemValue>(() => {
    const found = options.find(opt => opt.id === configData?.format)
    return found || options[0]
  })

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
    value={selected}
    onChange={(val: ListItemValue) => {
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

function NumberDivideBy() {

}

function NumberShownAs() {
  const { setConfig, data } = useCustomFieldStore()
  const configData = data.config as Prisma.JsonObject
  const shownAs = [
    { value: 'number', title: 'Number', icon: <TbNumber29Small className="w-5 h-5" /> },
    { value: 'bar', title: 'Bar', icon: <IoBatteryHalfOutline className="w-5 h-5" /> },
    { value: 'ring', title: 'Ring', icon: <RiDonutChartLine className="w-5 h-5" /> },
  ]
  const [selected, setSelected] = useState(configData?.shownAs || 'number')
  const [divideBy, setDivideBy] = useState('100')
  const isNumberOrRing = selected === 'bar' || selected === 'ring'

  useEffect(() => {
    if (!data.id) {
      setConfig({ shownAs: 'number' })
    }
  }, [])

  return <div className="form-control">
    <label>Shown as</label>
    <div className="grid grid-cols-3 gap-2">
      {shownAs.map(item => {
        const active = item.value === selected ? 'ring-2 ring-indigo-400' : ''
        return <div key={item.value}
          onClick={() => {
            setConfig({ shownAs: item.value, divide: divideBy })
            setSelected(item.value)
          }}
          className={`text-gray-600 dark:hover:bg-gray-800 cursor-pointer border rounded-md dark:border-gray-700 p-2 ${active}`}>
          {item.icon}
          <span className="text-[12px]">{item.title}</span>
        </div>
      })}

      {isNumberOrRing ?
        <div className="form-control col-span-3">
          <label>Divided by</label>
          <input className="form-input" value={divideBy} onChange={ev => {
            const value = ev.target.value
            setDivideBy(value)
            setConfig({ divide: value })
          }} />
        </div>
        : null}
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
