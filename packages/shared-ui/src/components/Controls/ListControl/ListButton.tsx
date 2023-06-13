import { useRef } from "react"
import { useListContext } from "./context"
import ListIcon, { XIcon } from "./ListIcon"

interface ListButtonProps {
  children: JSX.Element | string
}
export default function ListButton({children}: ListButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const {visible, setVisible, onChange, name, onFormikChange, placeholder} = useListContext()

  return <div className="select-button form-input group" 
    ref={buttonRef}
    tabIndex={0}
    onClick={() => setVisible(!visible)}
  >
    {children ? children : 
      (placeholder ? 
        <span className="text-gray-400">{placeholder}</span> :
        <span className="text-transparent">Option</span>
      )
    }

    <div className="trailing-icon group-hover:text-gray-500" >
      {children ? <XIcon onClick={(ev) => {
        ev.stopPropagation()
        setVisible(false)
        onChange && onChange({title: '', id: ''})
        name && onFormikChange && onFormikChange(name, {title: '', id: ''})
      }} /> : null}
      <ListIcon />
    </div>

  </div>
}
