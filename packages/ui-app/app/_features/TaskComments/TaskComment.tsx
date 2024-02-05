import { Form } from '@shared/ui'
import MemberAvatar from '@/components/MemberAvatar'
import { useUser } from '@goalie/nextjs'
import './style.css'
import { useCallback, useEffect, useState } from 'react'

interface ITaskCommentInputProps {
  userId: string
  initValue: string
  readOnly: boolean
  onValueSubmit: (s: string) => void
}

export default function TaskComment({
  userId,
  initValue,
  readOnly = false,
  onValueSubmit
}: ITaskCommentInputProps) {
  const [value, setValue] = useState(initValue)

  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  const onEnter = (value: string, target: HTMLTextAreaElement) => {
    // console.log(value, target)
    onValueSubmit(target.value)
    setValue('')
    // addNewContent(value)
    target.value = ''
  }

  const handleValueChanged = useCallback((inputValue: string) => {
    // console.log({ inputValue })
    setValue(inputValue)
  }, [])

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
      </div>
    </div>
  )
}
