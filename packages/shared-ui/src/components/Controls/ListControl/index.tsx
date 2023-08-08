import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { ListProvider } from './context'
import ListButton from './ListButton'
import ListItem from './ListItem'
import ListOptions from './ListOptions'
import { useListContext } from './context'
import { FormikFunc, ListItemValue } from './type'
import './style.css'
import ListSelectedItem from './ListSelectedItem'
import { randomId } from '../../utils'

interface ListControlProps {
  name?: string
  error?: string
  title?: string
  multiple?: boolean
  helper?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  placeholder?: string
  value: ListItemValue | ListItemValue[]
  children: JSX.Element[]
  onFormikChange?: FormikFunc
  onChange?: Dispatch<SetStateAction<ListItemValue>>
  onMultiChange?: Dispatch<SetStateAction<ListItemValue[]>>
}

interface ListContainerProps {
  children: JSX.Element | JSX.Element[]
}
const ListContainer = ({ children }: ListContainerProps) => {
  const { setVisible } = useListContext()
  const listId = randomId()

  // handle clicking outside dropdown list
  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement
      ev.stopPropagation()

      if (!target.closest(`.select-wrapper.list-rid-${listId}`)) {
        setVisible(false)
      }
    }

    const handleKeypress = (ev: KeyboardEvent) => {
      const key = ev.key.toLowerCase()
      if (key !== 'escape') return

      setVisible(false)
    }

    document.addEventListener('mouseup', handleClickOutside)
    document.addEventListener('keyup', handleKeypress)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
      document.removeEventListener('keyup', handleKeypress)
    }
  }, [setVisible])

  return <div className={`select-wrapper list-rid-${listId}`}>{children}</div>
}

export default function ListControl({
  title,
  name,
  error,
  multiple,
  disabled,
  readOnly,
  helper,
  placeholder = '',
  value,
  required,
  onChange,
  onMultiChange,
  onFormikChange,
  children
}: ListControlProps) {
  const [visible, setVisible] = useState(false)
  const classes = ['select-container form-control']

  disabled && classes.push('disabled')
  readOnly && classes.push('readonly')
  required && classes.push('required')
  error && classes.push('error')
  multiple ? classes.push('multiple') : classes.push('single')

  return (
    <div
      className={`${visible && !disabled && !readOnly ? '' : 'select-none'
        } ${classes.join(' ')}`}>
      {title ? <label>{title}</label> : null}
      <ListProvider
        value={{
          multiple,
          value,
          onChange,
          onMultiChange,
          visible,
          setVisible,
          name,
          onFormikChange,
          placeholder,
          disabled,
          readOnly
        }}>
        <ListContainer>{children}</ListContainer>
      </ListProvider>
      {helper && !error ? (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  )
}

ListControl.SelectedItem = ListSelectedItem
ListControl.Button = ListButton
ListControl.Options = ListOptions
ListControl.Item = ListItem
