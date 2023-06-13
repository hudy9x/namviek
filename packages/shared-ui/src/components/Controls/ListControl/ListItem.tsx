import { useListContext } from "./context"
import { ListItemValue } from "./type"

interface ListItemProps {
  value: ListItemValue
  children: JSX.Element | string
}

export default function ListItem({ value, children }: ListItemProps) {
  const { value: selected, onChange, setVisible, name, onFormikChange } = useListContext()

  const active = value.id === selected.id ? 'active' : ''
  const onClick = () => {
    onChange && onChange(value)
    name && onFormikChange && onFormikChange(name, value)
    setVisible(false)

  }
  return <div className={`select-item ${active}`} onClick={onClick}>
    {children}
  </div>

}
