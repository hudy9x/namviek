import { SuggestionProps } from '@tiptap/suggestion'
import {
  ReactElement,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import './MentionList.css'

import MemberAvatar from '@/components/MemberAvatar'

export type TItemBase = {
  id: string
  label: string
}
type TMemberMentionProps<I> = SuggestionProps<I>
type TMemberMentionRef = Ref<{ onKeyDown: ({ event }: { event: any }) => void }>

const Mention = <I,>(
  props: TMemberMentionProps<I & TItemBase>,
  ref: TMemberMentionRef
) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]

    if (item) {
      const { id, label } = item
      props.command(item)
    }
  }

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    )
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      const key = event.key
      if (key === 'Tab') {
        downHandler()
        return true
      }

      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    }
  }))

  return (
    <div className="mention-list">
      {props.items?.length ? (
        props.items?.map((item, index) => {
          let email = ''
          if ('email' in item) {
            email = item['email'] as string
          }

          return (
            <div
              className={`mention-item ${index === selectedIndex ? 'is-selected' : ''
                }`}
              key={index}
              onClick={() => {
                selectItem(index)
              }}>
              <div className="flex gap-3 items-center">
                <MemberAvatar uid={item.id || ''} noName={true} />
                <div className="text-left">
                  <h2 className="mb-0 text-sm">{item.label}</h2>
                  <p className="text-gray-400 text-xs">{email}</p>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  )
}

export default forwardRef(Mention) as <I>(
  p: TMemberMentionProps<I & TItemBase> & { r: TMemberMentionRef }
) => ReactElement
