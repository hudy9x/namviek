import { Form } from '@shared/ui'
import MemberAvatar from '@/components/MemberAvatar'
import './style.css'
import { useEffect, useState } from 'react'
import Mention from '@tiptap/extension-mention'
import { UserMember, useMemberStore } from '@/store/member'

interface ITaskCommentInputProps {
  userId: string
  initValue: string
  readOnly: boolean
  onValueSubmit: (s: string) => void
  onCancel?: () => void
  eraseAfterSubmit?: boolean
}

const TaskComment = ({
  userId,
  initValue,
  readOnly = false,
  onValueSubmit,
  onCancel,
  eraseAfterSubmit = false
}: ITaskCommentInputProps) => {
  const [value, setValue] = useState(initValue)

  const { members } = useMemberStore()

  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  const handleCancelClick = () => {
    setValue(initValue)
    onCancel && onCancel()
  }

  return (
    <div className="flex gap-2 items-start">
      <div className="mt-2">
        <MemberAvatar uid={userId || ''} noName={true} />
      </div>
      <div className="w-full">
        <Form.RichTextEditor
          onCtrlEnter={v => {
            onValueSubmit(v)
            eraseAfterSubmit && setValue('')
          }}
          onCtrlEsc={handleCancelClick}
          readOnly={readOnly}
          extensions={[
            Mention.extend({
              addAttributes() {
                return {
                  ...this.parent(),
                  value: {
                    default: ''
                  }
                }
              }
            }).configure({
              HTMLAttributes: {
                class: 'mention'
              },
              suggestion: Form.getMentionSuggestion<{
                id: string
                label: string
                email: string
              }>(
                members.map(({ id, name, email }) => ({
                  id,
                  label: name || id,
                  email
                }))
              )
            })
          ]}
          value={value}
        />
      </div>
    </div>
  )
}

export default TaskComment
