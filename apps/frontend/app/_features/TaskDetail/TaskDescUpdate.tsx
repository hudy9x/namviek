import { Form } from '@shared/ui'

export default function TaskDescUpdate({
  defaultValue,
  onChange
}: {
  defaultValue: string
  onChange: (v: string) => void
}) {
  return (
    <div
      className={`task-desc ProseMirror max-h-[600px] overflow-y-auto custom-scrollbar`}>
      <Form.TextEditor
        value={defaultValue}
        onChange={v => {
          onChange(v)
        }}
      />
    </div>
  )
}
