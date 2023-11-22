import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useState } from 'react'

interface ActivityCardCommentContentProps {
  content: string
}

const userReg = /@[\w\d]*(?=\b)/g
const linkReg = /(\[[^[]+\]\(.*\))/g
const contentReg = new RegExp([userReg.source, linkReg].join('|'), 'g')

// TODO: tiptap render content
const ActivityCardCommentContent = ({
  content
}: ActivityCardCommentContentProps) => {
  return <EditorContent editor={editor} />
}

export default ActivityCardCommentContent
