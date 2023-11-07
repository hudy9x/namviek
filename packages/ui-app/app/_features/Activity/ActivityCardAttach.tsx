import { Activity, ActivityType } from '@prisma/client'
import { ActivityAttachData } from '@shared/models'
import ActivityCardAttachContent from './ActivityCardAttachContent'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'

import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

interface IActivityCardAttachProps {
  activity: Activity
}

export default function ActivityCardAttach({
  activity
}: IActivityCardAttachProps) {
  const { uid, data, createdAt, type } = activity as Activity & {
    data: ActivityAttachData
  }
  const { attachedFiles } = data
  const { url } = attachedFiles?.length ? attachedFiles[0] : { url: '' }

  const createdTime = createdAt?.toLocaleDateString()

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Link.configure({ openOnClick: false })
    ],
    content: `
    <p>attached ${attachedFiles
      ?.map(({ url, name }) => `<a href='${url}'>${name}</a>`)
      .join(',')} at <a href="#">${createdTime}</a></p>
    `
  })
  const label = (() => {
    switch (type) {
      case ActivityType.TASK_ATTACHMENT_ADDED:
        return
    }
  })()
  const { title } = data

  return (
    <ActivityCard
      creator={<ActivityMemberAvatar uid={uid} />}
      title={
        <span>
          <ActivityMemberRepresent uid={uid} />
          <EditorContent editor={editor} />
        </span>
      }
      content={<ActivityCardAttachContent url={url} />}
    />
  )
}
