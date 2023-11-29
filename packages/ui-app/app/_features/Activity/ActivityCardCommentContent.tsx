import { useState } from 'react'
import { TextEditor } from 'packages/shared-ui/src/components/Controls'

import Mention from '@tiptap/extension-mention'
import Link from '@tiptap/extension-link'
import geMemberSuggestion from 'packages/shared-ui/src/components/Controls/TextEditorControl/MemberSuggestion'
import { Button } from '@shared/ui'
import { useMemberStore } from '@/store/member'

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
  const { members } = useMemberStore()
  const [value, setValue] = useState(content)

  const handleDiscardChange = () => {
    setValue(content)
    onDiscardContentChange && onDiscardContentChange()
  }
  return (
    <div>
      <div className="rounded-xl p-4 bg-slate-200 dark:bg-gray-700">
        <TextEditor
          disabled={readonly}
          extensions={[
            Link,
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
              suggestion: geMemberSuggestion(
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
      </div>
      {onSaveContent ? (
        <Button
          primary
          onClick={() => {
            console.log({ saving: value })
            onSaveContent(value)
          }}
          title="Save"
        />
      ) : null}
      {onDiscardContentChange ? (
        <Button onClick={handleDiscardChange} title="Discard" />
      ) : null}
    </div>
  )
}

export default ActivityCardCommentContent
