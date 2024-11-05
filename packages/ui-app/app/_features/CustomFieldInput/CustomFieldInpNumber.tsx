import { useEffect, useRef, useState } from "react"
import { useCustomFieldInputContext } from "./context"

function NumberFormat({ val, format }: { val: string, format: string }) {
  const formatNumber = (num: string, style: string) => {
    if (num === '') return;

    const numStr = num.toString();
    let formattedNum = numStr;

    switch (style) {
      case 'percent':
        formattedNum = numStr + ' %';
        break;
      case 'number-with-commas':
        formattedNum = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        break;
      case 'us-dollar':
        formattedNum = `$ ${numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        break;
      case 'vietnam-dong':
        formattedNum = `${numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₫`;
        break;
      default:
        formattedNum = numStr
        break;
    }

    return formattedNum;
  };

  return <span>{formatNumber(val, format)}</span>;
}

export default function CustomFieldInpNumber({ value, config }: { value: string, config: string }) {
  const fieldConfig = JSON.parse(config) as { width: number, format: string, shownAs: string }
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
      <div className="cf-display" onClick={ev => setEnableEdit(true)}>
        <NumberFormat val={val} format={fieldConfig.format} />
      </div>
    }
  </div>
}
