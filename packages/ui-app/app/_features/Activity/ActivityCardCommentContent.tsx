import { useState } from 'react'
import ActivityCardCommentMention from './ActivityCardCommentMention'
import { userReg, linkReg } from './regex'

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
              element = <a className="text-blue-600">{text}</a>
              break
          }
          if (element) visualContent.push(element)
        }
      }
    }

    return <p>{...visualContent}</p>
  }

  return (
    <div className="rounded border-black bg-white p-1">{renderContent()}</div>
  )
}

export default ActivityCardCommentContent
