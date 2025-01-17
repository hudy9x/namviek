import { Editor } from "@tiptap/react"
import { useCallback } from "react"
import { LuBold, LuItalic, LuStrikethrough, LuList, LuListOrdered, LuHeading1, LuHeading2, LuHeading3, LuCode2, LuCornerUpLeft, LuImage } from "react-icons/lu";
import Tooltip from "../../Tooltip"

export default function CommonMenuEditor({ editor }: { editor: Editor }) {
  const getClasses = (isActive: boolean) => {
    const classes = []

    classes.push('bubble-action-btn')

    isActive && classes.push('is-active')
    return classes.join(' ')
  }


  const setImage = useCallback(() => {
    const url = window.prompt('Image url:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }

  }, [editor])
  return <div className='flex gap-1 border border-gray-300 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 rounded-md dark:border-gray-700 dark:bg-gray-900 p-1'>
    <span
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={getClasses(editor.isActive('heading', { level: 1 }))}
    >
      <LuHeading1 />
    </span>
    <span
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      className={getClasses(editor.isActive('heading', { level: 2 }))}
    >
      <LuHeading2 />
    </span>

    <span
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      className={getClasses(editor.isActive('heading', { level: 3 }))}
    >
      <LuHeading3 />
    </span>

    <Tooltip title="Code block">
      <span
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={getClasses(editor.isActive('codeBlock'))}
      >
        <LuCode2 />
      </span>
    </Tooltip>


    <Tooltip title="Bullet list">
      <span
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={getClasses(editor.isActive('bulletList'))}
      >
        <LuList />
      </span>
    </Tooltip>


    <Tooltip title="Ordered list">
      <span
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={getClasses(editor.isActive('orderedList'))}
      >
        <LuListOrdered />
      </span>
    </Tooltip>

    <Tooltip title="Bold">
      <span
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={getClasses(editor.isActive('bold'))}
      >
        <LuBold />
      </span>
    </Tooltip>

    <Tooltip title="Italic">
      <span
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={getClasses(editor.isActive('italic'))}
      >
        <LuItalic />
      </span>
    </Tooltip>

    <Tooltip title="Linethrough">
      <span
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={getClasses(editor.isActive('strike'))}
      >
        <LuStrikethrough />
      </span>
    </Tooltip>
    <span
      onClick={setImage}
      className={getClasses(editor.isActive('strike'))}
    >
      <LuImage />
    </span>

    <Tooltip title="Hard break">
      <span
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="bubble-action-btn"
      >
        <LuCornerUpLeft />
      </span>
    </Tooltip>
  </div>

}
