import { useState } from 'react'
import { TextEditor } from 'packages/shared-ui/src/components/Controls'

import { Button } from '@shared/ui'
import { useMemberStore } from '@/store/member'
import { useActivityContext } from './context'

interface ActivityCardCommentContentProps {
  content: string
  onDiscardContentChange?: () => void
  onSaveContent?: (newContent: string) => void
  readonly?: boolean
}

const ActivityCardCommentContent = ({
  content,
  onDiscardContentChange,
  onSaveContent,
  readonly = false
}: ActivityCardCommentContentProps) => {
  const [value, setValue] = useState(content)

  // TODO: reset text editor content
  const handleDiscardChange = () => {
    console.log({ init_content: content })
    setValue(content)
    onDiscardContentChange && onDiscardContentChange()
  }
  return (
    <div>
      <TextEditor value={value} onChange={setValue} disabled={readonly} />
      {onSaveContent && !readonly ? (
        <Button
          primary
          onClick={() => {
            // console.log({ saving: value })
            onSaveContent(value)
          }}
          title="Save"
        />
      ) : null}
      {onDiscardContentChange && !readonly ? (
        <Button onClick={handleDiscardChange} title="Discard" />
      ) : null}
    </div>
  )
}

export default ActivityCardCommentContent
