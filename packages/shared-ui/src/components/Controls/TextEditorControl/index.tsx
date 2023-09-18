import { LexicalComposer } from '@lexical/react/LexicalComposer'
import defaultTheme from "./themes/themeDefault";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import type { EditorState } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TRANSFORMERS } from '@lexical/markdown';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import './style.css'

import { TexteditorProps } from '../type'

export default function TextareaControl({
  title,
  value,
  name,
  onChange,
  placeholder,
  helper,
  error,
  required,
  disabled = false,
  readOnly
}: TexteditorProps) {
  const classes = ['form-control']

  const initialConfig = {
    namespace: 'MyEditor',
    theme: defaultTheme,
    editorState: value ? value : undefined,
    onError: (er: Error) => console.log(er),
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ]
  }


  disabled && classes.push('disabled')
  required && classes.push('required')
  readOnly && classes.push('readonly')
  error && classes.push('error')

  return (
    <div className={classes.join(' ')}>
      {title ? <label>{title}</label> : null}
      <div className="relative form-control-wrapper inline-flex w-full">
        <div className="form-input">
          {/* <EditorContent className="text-editor" editor={editor} /> */}
          <div className='relative'>
            <LexicalComposer initialConfig={initialConfig}>
              <RichTextPlugin
                contentEditable={<ContentEditable style={{ outline: 'none' }} />}
                placeholder={<div className='text-gray-500 overflow-hidden absolute truncate top-0 select-none inline-block pointer-events-none' >{placeholder}</div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <ListPlugin />
              <LinkPlugin />
              <OnChangePlugin onChange={(editorState: EditorState) => {
                const editorStateJSON = editorState.toJSON();
                onChange && onChange(JSON.stringify(editorStateJSON))
              }} />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

            </LexicalComposer>
          </div>
        </div>
      </div>
      {helper && !error ? (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  )
}
