import { ChangeEvent, FocusEvent } from 'react'

interface InputBaseProps {
  title: string
  className: string
  value: string
  name: string
  type: string
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void
  onBlur: (ev: FocusEvent<HTMLInputElement>) => void
  placeholder: string
  helper: string
  error: string
  required: boolean
  disabled: boolean
  readOnly: boolean
  icon: JSX.Element
  addon: string
}

type RangerSliderBaseProps = Omit<InputBaseProps, 'onChange' | 'value' | 'onBlur'> & {
  onChange: (v: number) => void
  value: number
  maxValue: number
  step: number
}
type TextareaBaseProps = Omit<InputBaseProps, 'onChange'> & {
  onChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (ev: FocusEvent<HTMLTextAreaElement>) => void
  rows: number
  cols: number
}

type TexteditorBaseProps = Omit<InputBaseProps, 'onChange'> & {
  onChange: (ev: string) => void
}

export type RangerSlider = Partial<RangerSliderBaseProps>
export type InputProps = Partial<InputBaseProps>
export type TextareaProps = Partial<TextareaBaseProps>
export type TexteditorProps = Partial<TexteditorBaseProps>
