import { Button, Form } from '@shared/ui'
import MemberAvatar from '@/components/MemberAvatar'
import { useUser } from '@goalie/nextjs'
import './style.css'
import { ReactNode, forwardRef, useCallback, useEffect, useState } from 'react'
import Mention from '@tiptap/extension-mention'
import { useMemberStore } from '@/store/member'

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
    <div className="flex items-start gap-2">
      <MemberAvatar uid={userId || ''} noName={true} />
      <div className="w-full">
        <Form.RichTextEditor
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
              suggestion: Form.getMentionSuggestion(
                members.map(({ id, name }) => ({ id, label: name || id }))
              )
            })
          ]}
          value={value}
          onChange={v => {
            setValue(v)
          }}
        />
        {!readOnly ? (
          <div className="flex gap-2 m-2">
            <Button
              primary
              size="base"
              title="Save"
              onClick={() => {
                onValueSubmit(value)
                eraseAfterSubmit && setValue('')
              }}
            />
            <Button title="Cancel" size="base" onClick={handleCancelClick} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TaskComment
