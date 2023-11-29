import { ReactRenderer } from '@tiptap/react'
import tippy, { Instance } from 'tippy.js'

// import MentionList from './MentionList.jsx'

// import { MentionOptions } from '@tiptap/extension-mention'
import MemberMention from './MemberMention'
import { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion'
import { User } from '@prisma/client'
import { type TItemBase } from './MemberMention'

type IItem = Partial<User> & TItemBase

export default function getMemberMention<T>(items: (IItem & T)[]) {
  return {
    items: ({ query }): IItem[] => {
      return (
        items
          // .map((item, i) => ({ id: i.toString(), label: item }))
          .filter(({ label }) =>
            label.toLowerCase().startsWith(query.toLowerCase())
          )
          .slice(0, 5)
      )
    },

    render: () => {
      let component: ReactRenderer
      let popup: Instance[]

      return {
        onStart: (props: SuggestionProps) => {
          component = new ReactRenderer(MemberMention, {
            props,
            editor: props.editor
          })

          if (!props.clientRect) {
            return
          }

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start'
          })
        },

        onUpdate(props) {
          component.updateProps(props)

          if (!props.clientRect) {
            return
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect
          })
        },

        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            popup[0].hide()

            return true
          }

          return component.ref?.onKeyDown(props)
        },

        onExit() {
          popup[0].destroy()
          component.destroy()
        }
      }
    }
  } as Partial<SuggestionOptions>
}
