import { useState } from 'react'
import { TextEditor } from 'packages/shared-ui/src/components/Controls'

import { Button } from '@shared/ui'

interface ActivityCardCommentContentProps {
  content: string
  onDiscardContentChange?: () => void
  onSaveContent?: (newContent: string) => void
  readonly?: boolean
  onEditEnd: () => void
}

const ActivityCardCommentContent = ({
  content,
  onDiscardContentChange,
  onSaveContent,
  readonly = false,
  onEditEnd
}: ActivityCardCommentContentProps) => {
  const [value, setValue] = useState(content)

  const handleDiscardChange = () => {
    setValue(content)
    onDiscardContentChange && onDiscardContentChange()
    onEditEnd()
  }

  const handleSaveUpdate = () => {
    onSaveContent && onSaveContent(value)
    onEditEnd()
  }
  return (
    <div>
      <TextEditor value={value} onChange={setValue} disabled={readonly} />
      {!readonly ? (
        <div className="flex gap-1 mt-2">
          {onSaveContent ? (
            <Button primary onClick={handleSaveUpdate} title="Save" size="sm" />
          ) : null}
          {onDiscardContentChange ? (
            <Button onClick={handleDiscardChange} title="Discard" size="sm" />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default ActivityCardCommentContent
