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

  const onEnter = (value: string, target: HTMLTextAreaElement) => {
    onValueSubmit(target.value)
    setValue('')
    target.value = ''
  }

  const handleValueChanged = useCallback((inputValue: string) => {
    setValue(inputValue)
  }, [])

  const handleCancelClick = () => {
    setValue(initValue)
    onCancel && onCancel()
  }

  return (
    <div className="flex items-start gap-2 mb-3">
      <MemberAvatar uid={userId || ''} noName={true} />
      <div className="w-full">
        {/* <Form.Textarea */}
        {/*   placeholder="Write your comments" */}
        {/*   value={value} */}
        {/*   readOnly={readOnly} */}
        {/*   onChange={ev => handleValueChanged(ev.currentTarget.value)} */}
        {/*   onEnter={onEnter} */}
        {/*   rows={1} */}
        {/* /> */}

        <Form.RichTextEditor
          readOnly={readOnly}
          extensions={[
            // Link,
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
            // console.log({ v })
            setValue(v)
          }}
        />

        {!readOnly ? (
          <div>
            <Button
              title="Save"
              onClick={() => {
                onValueSubmit(value)
                eraseAfterSubmit && setValue('')
              }}
            />
            <Button title="Cancel" onClick={handleCancelClick} />
          </div>
        ) : null}
        <Form.RichTextEditor />
      </div>
    </div>
  )
}

// TaskComment.displayName = 'TaskComment'
export default TaskComment
