import { useEffect, useRef, useState } from "react"
import { useCustomFieldInputContext } from "./context"
import { RiMailSendLine } from "react-icons/ri"

export default function CustomFieldInpEmail({ value, config }: { value: string, config: string }) {
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

  useEffect(() => {
    setVal(value)
  }, [value])

  return <div className="cf-input-container">
    {enableEdit ?
      <input ref={ref} className="cf-edit"
        onBlur={ev => {
          setEnableEdit(false)
          const inpVal = ev.target.value
          if (inpVal === val) return
          setVal(inpVal)
          onChange(inpVal)
        }}
        defaultValue={val || ''} />
      :
      <div className="cf-display group flex gap-2 items-center"
        onClick={ev => setEnableEdit(true)}>
        <span className="">{val}</span>
        {val ?
          <a href={`mailto:${val}`} target="_blank"><RiMailSendLine className="opacity-0 group-hover:opacity-100 transition-all" /></a>
          : null}
      </div>
    }
  </div>
}
