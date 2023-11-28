import { useState } from 'react'
import ActivityCardCommentMention from './ActivityCardCommentMention'
import { userReg, linkReg } from './regex'
import ActivityCardCommentLink from './ActivityCardCommentLink'

interface ActivityCardCommentContentProps {
  content: string
}

const regDelimiter = '<@@-just-regex-delimieter-@@>'

const contentReg = new RegExp([userReg.source, linkReg.source].join('|'), 'g')

// TODO: tiptap render content
const ActivityCardCommentContent = ({
  content
}: ActivityCardCommentContentProps) => {
  const renderContent = () => {
    const renderableObjects = Array.from(content.matchAll(contentReg))
    const textObjects = content
      .replace(contentReg, regDelimiter)
      .split(regDelimiter)

    const visualContent = []

    let i = 0,
      j = 0
    for (; i < textObjects.length; i++) {
      visualContent.push(textObjects[i])
      for (; j < renderableObjects.length; j++) {
        const group = renderableObjects[j]
        for (let k = 1; k < group.length; k++) {
          const text = group[k]
          if (!text) continue
          let element
          switch (k) {
            case 1:
              element = <ActivityCardCommentMention memberId={text.slice(1)} />
              break
            case 2:
              element = <ActivityCardCommentLink linkObject={text} />
              break

            case 3:
              element = <br />
              break
          }
          if (element) visualContent.push(element)
        }
      }
    }

    return <p>{...visualContent}</p>
  }

  return (
    <div className="rounded-xl p-4 bg-slate-200 dark:bg-gray-700">
      {renderContent()}
    </div>
  )
}

export default ActivityCardCommentContent
