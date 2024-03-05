import { ChangeEvent, FocusEvent } from 'react'
import { Node, Mark } from '@tiptap/core'

interface InputBaseProps {
  title: string
  className: string
  value: string
  name: string
  type: string
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void
  onBlur: (ev: FocusEvent<HTMLInputElement>) => void
  onEnter: (val: string, target: HTMLInputElement) => void
  onEsc: (target: HTMLInputElement) => void
  placeholder: string
  helper: string
  focus: boolean
  error: string
  required: boolean
  disabled: boolean
  readOnly: boolean
  icon: JSX.Element
  addon: string
}

type RangerSliderBaseProps = Omit<
  InputBaseProps,
  'onChange' | 'value' | 'onBlur' | 'onEnter'
> & {
  onChange: (v: number) => void
  value: number
  maxValue: number
  step: number
}
type TextareaBaseProps = Omit<InputBaseProps, 'onChange' | 'onEnter'> & {
  onChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (ev: FocusEvent<HTMLTextAreaElement>) => void
  onEnter: (val: string, target: HTMLTextAreaElement) => void
  rows: number
  cols: number
}

type RichTextEditorBaseProps = Omit<InputBaseProps, 'onChange' | 'onEnter'> & {
  onBlur: (ev: FocusEvent<HTMLTextAreaElement>) => void
  onCtrlEnter?: (val: string) => void
  onCtrlEsc?: () => void
  rows: number
  cols: number
  extensions?: (Node | Mark)[]
}

type TexteditorBaseProps = Omit<InputBaseProps, 'onChange' | 'onEnter'> & {
  onChange: (ev: string) => void
}

export type TRichTextEditorMention = {
  id: string
  label: string
}

export type RangerSlider = Partial<RangerSliderBaseProps>
export type InputProps = Partial<InputBaseProps>
export type TextareaProps = Partial<TextareaBaseProps>
export type TexteditorProps = Partial<TexteditorBaseProps>
export type RichTextEditorProps = Partial<RichTextEditorBaseProps>
