import { Form } from "@shared/ui";
import { useCustomFieldStore } from "./store";
import { HiOutlinePlus } from "react-icons/hi2";
import { useState } from "react";

type TOption = {
  id: string,
  value: string,
  color: string
}
function CreateOptionForm() {
  const [options, setOptions] = useState<TOption[]>([])

  return <div className="form-control">
    <label>Create option</label>
    <div>
      {options.map(option => {
        return <div key={option.id}>
          
        </div>
      })}

    </div>
    <div className="flex text-sm cursor-pointer items-center gap-2"><HiOutlinePlus /> <span>Add option</span></div>
  </div>
}
export default function CreateFieldSelect() {
  const { data, setData } = useCustomFieldStore()
  const { name } = data

  return <div className="space-y-3">
    <Form.Input value={name || ''} onChange={ev => {
      setData({ name: ev.target.value })
    }} title="Field name" placeholder="Input your field name" required className="w-full" />

    <CreateOptionForm />

  </div>
}
