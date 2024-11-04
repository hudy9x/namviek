import { useEffect, useRef, useState } from "react"
import { useCustomFieldInputContext } from "./context"

export default function CustomFieldInpNumber({ value, config }: { value: string, config: string }) {
  console.log(config)
  const [enableEdit, setEnableEdit] = useState(false)
  const { onChange } = useCustomFieldInputContext()
  const [val, setVal] = useState(value)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const inpElem = ref.current
    if (enableEdit && inpElem) {

      inpElem.focus()
    }
  }, [enableEdit, ref])

  const handleUpdate = (inpVal: string) => {
    setEnableEdit(false)
    if (inpVal === val) return
    setVal(inpVal)
    onChange(inpVal)
  }

  return <div className="cf-input-container">
    {enableEdit ?
      <input ref={ref} className="cf-edit"
        onKeyUp={ev => {
          const target = ev.target as HTMLInputElement
          if (ev.key === 'Enter') {
            handleUpdate(target.value)
          }

        }}
        onBlur={ev => {
          const inpVal = ev.target.value
          handleUpdate(inpVal)
        }}
        defaultValue={val || ''} />
      :
      <div className="cf-display" onClick={ev => setEnableEdit(true)}>{val}</div>
    }
  </div>
}
