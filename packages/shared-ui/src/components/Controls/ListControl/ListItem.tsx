import { CheckIcon } from './ListIcon'
import { useListContext } from './context'
import { ListItemValue } from './type'

interface ListItemProps {
  keepMeOnly?: boolean // when `true` and in multiple mode, it will clear all value but itself
  value: ListItemValue
  children: JSX.Element | string
}

export default function ListItem({
  value,
  children,
  keepMeOnly
}: ListItemProps) {
  const {
    value: selected,
    multiple,
    onChange,
    onMultiChange,
    setVisible,
    name,
    onFormikChange
  } = useListContext()

  const disabled = value.disabled ? 'disabled' : ''
  let active = ''

  if (Array.isArray(selected)) {
    const found = selected.find(s => s.id === value.id)
    active = found ? 'active' : ''
  } else {
    active = value.id === selected.id ? 'active' : ''
  }

  const onClick = () => {
    if (value.disabled === true) return

    if (multiple && onMultiChange) {
      onMultiChange(prev => {
        // clear others selected, but itself
        if (keepMeOnly) {
          return [value]
        }

        if (Array.isArray(prev)) {
          // click on a selected item, remove it
          if (prev.find(p => p.id === value.id)) {
            return prev.filter(p => p.id !== value.id)
          }

          // click on a unselected item, select it
          return [...prev.filter(p => p.id !== 'ALL'), value]
        } else {
          return prev
        }
      })
    }

    if (!multiple && onChange) {
      onChange && onChange(value)
    }

    name && onFormikChange && onFormikChange(name, value)
    setVisible(false)
  }
  return (
    <div className={`select-item ${active} ${disabled}`} onClick={onClick}>
      {children}
      <CheckIcon />
    </div>
  )
}
