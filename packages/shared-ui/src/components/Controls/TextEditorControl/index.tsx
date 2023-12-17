import { ChangeEvent, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

import './style.css';

import { TextareaProps, TexteditorProps } from '../type';

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
  const classes = ['form-control'];
  const [val, setValue] = useState(value);

  // const onInputChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
  //   onChange && onChange(ev);
  // };

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: val,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange && !disabled && onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    setValue(value)
    value && editor?.commands.setContent(value)
  }, [value, editor])


  useEffect(() => {
    editor && editor.setEditable(!disabled);
  }, [disabled, editor]);

  disabled && classes.push('disabled');
  required && classes.push('required');
  readOnly && classes.push('readonly');
  error && classes.push('error');

  return (
    <div className={classes.join(' ')}>
      {title ? <label>{title}</label> : null}
      <div className="relative form-control-wrapper inline-flex w-full">
        <div className="form-input">
          <EditorContent className="text-editor" editor={editor} />
        </div>
        {/* <textarea */}
        {/*   value={val} */}
        {/*   name={name} */}
        {/*   cols={cols} */}
        {/*   rows={rows} */}
        {/*   disabled={disabled} */}
        {/*   readOnly={readOnly} */}
        {/*   onChange={onInputChange} */}
        {/*   placeholder={placeholder} */}
        {/*   className="form-input" */}
        {/* /> */}
      </div>
      {helper && !error ? <p className="mt-2 text-sm text-gray-500">{helper}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
