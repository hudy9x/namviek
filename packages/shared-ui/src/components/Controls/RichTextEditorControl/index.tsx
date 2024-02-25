import { useEffect, useState } from 'react'
import { TextareaProps } from '../type'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
// import { Extension } from '@tiptap/core'
// import { keymap } from '@tiptap/pm/keymap'
// import { baseKeymap } from '@tiptap/pm/commands'

import { Text } from '@tiptap/extension-text'

// const KeyEventHandler = Extension.create({
//   name: 'KeyEventHandler',
//
//   addProseMirrorPlugins() {
//     return [
//       keymap(baseKeymap),
//       keymap({
//         'Shift-a': () => {
//           console.log('Shift-a pressed')
//           return true
//         }
//       })
//     ]
//   }
// })

export default function RichTextEditor({
  title,
  value,
  helper,
  error,
  required,
  disabled,
  readOnly,
  extensions = [],
  onCtrlEnter,
  onCtrlEsc
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
      // KeyEventHandler,
      Text.extend({
        addKeyboardShortcuts() {
          return {
            'Control-Enter': () => {
              console.log('Control-enter pressed')
              const text = this.editor.getText()
              console.log({ text })
              text && onCtrlEnter && onCtrlEnter(text)
              return true
            },
            'Control-Escape': () => {
              console.log('Control-escape pressed')
              onCtrlEsc && onCtrlEsc()
              return true
            }
          }
        }
      }),
      ...extensions
    ],
    editable: !readOnly,
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
      </div>
      {helper && !error ? (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  )
}
