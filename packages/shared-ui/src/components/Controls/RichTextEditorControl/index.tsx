import { useEffect, useState } from 'react'
import { TextareaProps } from '../type'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

export default function RichTextEditor({
  title,
  value,
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
      const newContent = editor.getHTML()
      onChange && !disabled && onChange(newContent) // TODO: need to update parent value?
    },
    content: value
  })

  useEffect(() => {
    value &&
      editor?.commands.setContent(value, false, { preserveWhitespace: 'full' })
  }, [value, editor])

  useEffect(() => {
    editor?.setEditable(!readOnly, true)
  }, [readOnly, editor])

  if (!editor) {
    return null
  }

  return (
    <div className={classes.join(' ')}>
      {title ? <label>{title}</label> : null}
      <div className="relative form-control-wrapper inline-flex w-full">
        <div className="form-input">
          <EditorContent editor={editor} />
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
