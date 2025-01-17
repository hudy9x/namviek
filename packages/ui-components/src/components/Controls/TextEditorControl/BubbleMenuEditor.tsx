import { BubbleMenu, Editor } from "@tiptap/react";
import CommonMenuEditor from "./CommonEditorMenu";

export default function BubbleMenuEditor({ editor }: { editor: Editor }) {

  return <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
    <CommonMenuEditor editor={editor} />
  </BubbleMenu>
}
