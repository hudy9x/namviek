import { ChangeEvent } from 'react'

interface InputBaseProps {
  title: string
  value: string
  name: string
  type: string
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  helper: string
  error: string
  required: boolean
  disabled: boolean
  readOnly: boolean
  icon: JSX.Element
  addon: string
}

type TextareaBaseProps = Omit<InputBaseProps, "onChange"> & {
  onChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void
  rows: number
  cols: number
}

type TexteditorBaseProps = Omit<InputBaseProps, "onChange"> & {
  onChange: (ev: string) => void
}

export type InputProps = Partial<InputBaseProps>
export type TextareaProps = Partial<TextareaBaseProps>
export type TexteditorProps = Partial<TexteditorBaseProps>



