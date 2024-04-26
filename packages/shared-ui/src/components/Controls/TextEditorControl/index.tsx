import { ChangeEvent, useEffect, useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { TextareaProps, TexteditorProps } from '../type'
import { LuBold, LuItalic, LuStrikethrough, LuListOrdered, LuList } from "react-icons/lu";

import './style.css'


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
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: val,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      console.log('on update ')
      onChange && !disabled && onChange(editor.getHTML())
    }
  })

  useEffect(() => {
    // setValue(value)
    // value && editor?.commands.setContent(value)
  }, [value, editor])

  useEffect(() => {
    editor && editor.setEditable(!disabled)
  }, [disabled, editor])

  disabled && classes.push('disabled')
  required && classes.push('required')
  readOnly && classes.push('readonly')
  error && classes.push('error')

  const getClasses = (isActive: boolean) => {
    const classes = []

    classes.push('bubble-action-btn')

    isActive && classes.push('is-active')
    return classes.join(' ')
  }

  return (
    <div className={classes.join(' ')}>
      {title ? <label>{title}</label> : null}
      <div className="relative form-control-wrapper inline-flex w-full">
        <div className="form-input">
          {editor &&
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <div className='flex gap-1 border rounded-md dark:border-gray-700 dark:bg-gray-900 py-2 px-2'>
                <span
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={getClasses(editor.isActive('bold'))}
                >
                  <LuBold />
                </span>
                <span
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={getClasses(editor.isActive('italic'))}
                >
                  <LuItalic />
                </span>
                <span
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={getClasses(editor.isActive('strike'))}
                >
                  <LuStrikethrough />
                </span>
              </div>
            </BubbleMenu>
          }
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
