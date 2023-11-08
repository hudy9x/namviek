import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import { useState } from 'react'

interface ActivityCardCommentContentProps {
  content: string
}
//
// TODO: tiptap render content
const ActivityCardCommentContent = ({
  content
}: ActivityCardCommentContentProps) => {
  const editor = useEditor(
    {
      extensions: [
        Document,
        Paragraph,
        Text,
        Link.configure({
          openOnClick: false
        })
      ],
      editable: false,
      content
    },
    [content]
  )

  return <EditorContent editor={editor} />
}

export default ActivityCardCommentContent
