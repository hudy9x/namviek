
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
      console.log({ item, command: props.command })
      const { id, label } = item
      props.command({ id, label })
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
    <div className="items">
      {props.items?.length ? (
        props.items?.map((item, index) => (
          <button
            className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
            key={index}
            onClick={() => selectItem(index)}>
            {item.label}
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  )
}

export default forwardRef(Mention) as <I>(
  p: TMemberMentionProps<I & TItemBase> & { r: TMemberMentionRef }
) => ReactElement
