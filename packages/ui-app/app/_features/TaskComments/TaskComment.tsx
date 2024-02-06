import { Button, Form } from '@shared/ui'
import MemberAvatar from '@/components/MemberAvatar'
import { useUser } from '@goalie/nextjs'
import './style.css'
import { ReactNode, forwardRef, useCallback, useEffect, useState } from 'react'

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
        <Form.Textarea
          placeholder="Write your comments"
          value={value}
          readOnly={readOnly}
          onChange={ev => handleValueChanged(ev.currentTarget.value)}
          onEnter={onEnter}
          rows={1}
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
      </div>
    </div>
  )
}

// TaskComment.displayName = 'TaskComment'
export default TaskComment
