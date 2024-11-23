import { useEffect, useRef, useState } from "react"
import { useCustomFieldInputContext } from "./context"
import { HiOutlineExternalLink } from "react-icons/hi"

export default function CustomFieldInpUrl({ value, config }: { value: string, config: string }) {
  const [enableEdit, setEnableEdit] = useState(false)
  const { onChange } = useCustomFieldInputContext()
  const [val, setVal] = useState(value)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setVal(value)
  }, [value])

  useEffect(() => {
    const inpElem = ref.current
    if (enableEdit && inpElem) {
      inpElem.focus()
    }
  }, [enableEdit, ref])

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
          <a href={val} target="_blank"><HiOutlineExternalLink className="opacity-0 group-hover:opacity-100 transition-all" /></a>
          : null}
      </div>
    }
  </div>
}
