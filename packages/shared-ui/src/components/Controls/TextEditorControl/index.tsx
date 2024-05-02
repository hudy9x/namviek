import { useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from "@tiptap/extension-image";
import { TexteditorProps } from '../type'

import './style.css'
import FloatingMenuEditor from './FloatingMenuEditor';
import BubbleMenuEditor from './BubbleMenuEditor';


export default function TextareaControl({
  title,
  value,
  name,
  onChange,
  placeholder,
  helper,
  error,
  required,
  disabled = false,
  readOnly
}: TexteditorProps) {
  const classes = ['form-control']
  const [val, setValue] = useState(value)

  // const onInputChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
  //   onChange && onChange(ev);
  // };

  const editor = useEditor({
    extensions: [StarterKit, Image, Link.configure({ openOnClick: true })],
    content: val,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      if (disabled) return
      console.log('on update ')

      const content = editor.getHTML()

      onChange && onChange(content)
      setValue(content)
    }
  })

  useEffect(() => {
    // it should be run as prop change
    if (value !== val) {
      setValue(value)
      value && editor?.commands.setContent(value)
    }
  }, [value, editor, val])

  useEffect(() => {
    editor && editor.setEditable(!disabled)
  }, [disabled, editor])

  disabled && classes.push('disabled')
  required && classes.push('required')
  readOnly && classes.push('readonly')
  error && classes.push('error')


  return (
    <div className={classes.join(' ')}>
      {title ? <label>{title}</label> : null}
      <div className="relative form-control-wrapper inline-flex w-full">
        <div className="form-input">
          {editor && <BubbleMenuEditor editor={editor} />}
          {editor && <FloatingMenuEditor editor={editor} />}
          <EditorContent className="text-editor" spellCheck={false} editor={editor} />
        </div>
      </div>
      {helper && !error ? (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  )
}
