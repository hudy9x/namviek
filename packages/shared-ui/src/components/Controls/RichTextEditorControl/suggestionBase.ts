import { ReactRenderer } from '@tiptap/react'
import tippy, { Instance } from 'tippy.js'

import MentionList from './MentionList'

import { type TRichTextEditorMention } from '../type'
import { SuggestionOptions } from '@tiptap/suggestion'

export const getMentionSuggestion = <T,>(items: (TRichTextEditorMention & T)[]): Partial<SuggestionOptions> => ({
  items: ({ query }): TRichTextEditorMention[] => {
    return (
      items
        // .map((item, i) => ({ id: i.toString(), label: item }))
        .filter(({ label }) =>
          label.toLowerCase().startsWith(query.toLowerCase())
        )
        // .slice(0, 5)
    )
  },

  render: () => {
      let component: ReactRenderer
      let popup: Instance[]

    return {
      onStart: props => {
        component = new ReactRenderer(MentionList, {
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
})
