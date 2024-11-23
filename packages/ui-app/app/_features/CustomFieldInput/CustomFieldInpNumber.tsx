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

function NumberShownAs({ val, type, divide }: { val: string, type: string, divide: string }) {
  if (!type || !divide || !val) return null
  if (type === 'number') return null
  const parsedValue = parseInt(val, 10)
  const parsedDivide = parseInt(divide, 10)
  const percentage = Math.max(Math.min(100, parsedValue * 100 / parsedDivide), 0)

  const progressBar = () => {
    return <div className="w-full bg-gray-200 rounded-full h-1.5  dark:bg-gray-700">
      <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" style={{ width: `${percentage}%` }}></div>
    </div>
  }

  const circularBar = () => {
    return <div className="w-5 relative size-40">
      <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle */}
        <circle cx="18" cy="18" r="14" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="5"></circle>
        {/* Progress Circle */}
        <circle cx="18" cy="18" r="14" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" strokeWidth="5" strokeDasharray={100} strokeDashoffset={100 - percentage} strokeLinecap="round"></circle>
      </svg>
    </div>
  }

  const displayBar = type === 'bar' ? progressBar() : circularBar()

  return <>{displayBar}</ >
}

export default function CustomFieldInpNumber({ value, config }: { value: string, config: string }) {
  const fieldConfig = JSON.parse(config) as { width: number, format: string, shownAs: string, divide: string }
  const [enableEdit, setEnableEdit] = useState(false)
  const { onChange } = useCustomFieldInputContext()
  const [val, setVal] = useState(value)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setVal(prev => {
      if (prev !== value) return value
      return prev
    })
  }, [value])

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
      <div className="cf-display flex items-center justify-between gap-2" onClick={ev => setEnableEdit(true)}>
        <NumberFormat val={val} format={fieldConfig.format} />
        <NumberShownAs val={val} type={fieldConfig.shownAs} divide={fieldConfig.divide} />
      </div>
    }
  </div>
}
