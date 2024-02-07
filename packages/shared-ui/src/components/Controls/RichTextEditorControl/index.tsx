import { useEffect, useState } from 'react'
import { TextareaProps } from '../type'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

export default function TextareaControl({
  title,
  value,
  name,
  onChange,
  onEnter,
  helper,
  error,
  required,
  disabled,
  readOnly,
  extensions = []
}: TextareaProps) {
  const classes = ['form-control']
  const [val, setValue] = useState(value)

  // const onInputChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
  //   onChange && onChange(ev)
  // }

  disabled && classes.push('disabled')
  required && classes.push('required')
  readOnly && classes.push('readonly')
  error && classes.push('error')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      ...extensions
    ],
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange && !disabled && onChange(editor.getHTML()) // TODO: need to update parent value?
    },
    content: val
  })

  useEffect(() => {
    setValue(value)
    editor && value && editor.commands.setContent(value)
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <div className={classes.join(' ')}>
      {title ? <label>{title}</label> : null}
      <div className="relative form-control-wrapper inline-flex w-full">
        <div className="w-full ">
          <EditorContent className="text-editor" editor={editor} />
        </div>
        {/* <textarea */}
        {/*   value={val} */}
        {/*   name={name} */}
        {/*   cols={cols} */}
        {/*   rows={rows} */}
        {/*   disabled={disabled} */}
        {/*   readOnly={readOnly} */}
        {/*   onChange={onInputChange} */}
        {/*   onKeyUp={ev => { */}
        {/*     const target = ev.target as HTMLTextAreaElement */}
        {/*     if (ev.key === 'Enter' && !ev.shiftKey) { */}
        {/*       onEnter && onEnter(target.value, target) */}
        {/*       console.log('pressed Enter') */}
        {/*     } */}
        {/*   }} */}
        {/*   placeholder={placeholder} */}
        {/*   className="form-input" */}
        {/* /> */}
      </div>
      {helper && !error ? (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  )
}
