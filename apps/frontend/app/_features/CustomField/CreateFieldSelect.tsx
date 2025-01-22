import { Button, Form, IconColorPicker, colors } from "@ui-components";
import { TCustomFieldOption, useCustomFieldStore } from "./store";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";
import { useCallback, useState } from "react";
import { Prisma } from "@prisma/client";

function CreateOptionForm() {

  const { setData, data } = useCustomFieldStore(state => ({ setData: state.setData, data: state.data }))
  const defaultData = (data.data || {}) as Prisma.JsonObject
  const defaultOptionsData = (defaultData && defaultData.options ? defaultData.options : []) as TCustomFieldOption[]
  const [options, setOptions] = useState<TCustomFieldOption[]>(defaultOptionsData)

  const addNewOption = () => {
    setOptions(options => {
      console.log(options.length)
      const newOption: TCustomFieldOption = {
        id: options.length,
        order: options.length,
        value: '',
        color: colors[options.length]
      }
      return [...options, newOption]
    })
  }

  const onChangeColor = (index: number, color: string) => {

    const newOptions = options.map((opt, optIndex) => {
      if (optIndex === index) {
        console.log({ ...opt, color })
        return { ...opt, color }
      }

      return opt
    })
    setOptions(newOptions)
    saveOption(newOptions)
  }

  const onDeleteOption = (index: number) => {
    const newOptions = options.filter((opt, optIndex) => {
      return optIndex !== index
    })
    setOptions(newOptions)
    saveOption(newOptions)

  }

  const onUpdateOption = (index: number, value: string) => {
    setOptions(options => options.map((opt, optIndex) => {
      if (optIndex === index) {
        return { ...opt, value }
      }
      return opt
    }))

  }

  const saveOption = (options: TCustomFieldOption[]) => {
    setData({
      data: {
        options
      }
    })

  }

  const onSave = () => {
    setData({
      data: {
        options
      }
    })
  }


  return <div className="form-control">
    <label>Create option</label>
    <div className="space-y-1">
      {options.map((option, index) => {
        return <div key={option.id} className="flex items-center gap-2">
          <IconColorPicker value={option.color} onChange={(val: string) => {
            onChangeColor(index, val)
          }} />

          <Form.Input value={option.value} size="sm"
            onChange={ev => {
              onUpdateOption(index, ev.target.value)
            }}
            onEnter={v => {
              onSave()
              addNewOption()
            }}
            onBlur={(ev) => {
              onSave()
            }} className="w-full" />
          <Button size="sm"
            onClick={() => onDeleteOption(index)}
            leadingIcon={
              <HiOutlineTrash />
            } />
        </div>
      })}

    </div>
    <div
      onClick={addNewOption}
      className="mt-3 flex text-xs uppercase cursor-pointer items-center gap-2"><HiOutlinePlus /> <span>Add option</span></div>
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
