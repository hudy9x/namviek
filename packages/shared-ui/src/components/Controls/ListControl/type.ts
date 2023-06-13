import { Dispatch, SetStateAction } from "react"

export interface ListItemValue {
  id: string
  title: string
}

export type FormikFunc = (field: string, value: any) => void
export type ListOnChange = Dispatch<SetStateAction<ListItemValue>>

export interface ListContextProps {
  name?: string
  disabled?: boolean
  readOnly?: boolean
  visible: boolean
  placeholder: string
  setVisible: Dispatch<SetStateAction<boolean>>
  value: ListItemValue
  onChange?: ListOnChange
  onFormikChange?: FormikFunc
}

