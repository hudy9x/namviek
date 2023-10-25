import { KeyboardEvent, RefObject, useRef } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

interface AddNewBarProps {
  createNewAction: (
    e: KeyboardEvent<HTMLDivElement>,
    inputRef: RefObject<HTMLInputElement>
  ) => void
  itemName: string
}

export default function AddNewBar({
  createNewAction,
  itemName
}: AddNewBarProps) {
  const inputAddRef = useRef<HTMLInputElement>(null)

  const onPressEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    createNewAction(e, inputAddRef)
  }
  return (
    <div className="relative flex items-center rounded-b-lg bg-gray-50">
      <AiOutlinePlus className="absolute top-3.5 left-4 text-gray-500" />
      <input
        ref={inputAddRef}
        className="w-full py-3 pl-12 pr-8 text-sm text-gray-500 bg-transparent outline-none"
        placeholder={`Hit \`Enter\` to add a new ${itemName}`}
        onKeyDown={onPressEnter}
      />
    </div>
  )
}
