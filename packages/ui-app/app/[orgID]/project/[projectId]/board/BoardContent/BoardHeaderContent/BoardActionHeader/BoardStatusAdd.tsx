import { useState, useRef, KeyboardEvent } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useStatus } from 'packages/ui-app/app/_hook/status'
import { Popover } from 'packages/shared-ui/src/components/Controls'
import { colors } from '../../../../settings/status/type'

export const BoardStatusAdd = () => {
  const [currentColor, setCurrentColor] = useState<string>()
  const { createNewStatus } = useStatus({ currentColor })
  const inputRef = useRef<HTMLInputElement>(null)

  const onPressEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    createNewStatus(e, inputRef)
  }

  return (
    <Popover
      triggerBy={
        <div
          className={
            'p-3 flex rounded-md shadow-lg shadow-indigo-100 cursor-pointer bg-white h-10'
          }>
          <div className="flex items-center justify-center pr-1">
            <AiOutlinePlus className="cursor-pointer text-slate-500 text-xs" />
          </div>
          <input
            ref={inputRef}
            className="w-48 text-xs font-semibold text-slate-500 outline-none bg-transparent"
            onKeyDown={onPressEnter}
            placeholder="ADD STATUS"
          />
        </div>
      }
      content={
        <div className="grid grid-cols-6 gap-2 w-60 p-2 rounded bg-white border border-gray-30 mt-1">
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color,
                border: currentColor === color ? `3px solid #fff` : 'none'
              }}
              onClick={() => {
                setCurrentColor(color)
              }}
              className="w-6 h-6 cursor-pointer rounded"></div>
          ))}
        </div>
      }
    />
  )
}
