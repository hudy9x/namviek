import { Editor, FloatingMenu } from "@tiptap/react";
import CommonMenuEditor from "./CommonEditorMenu";

export default function FloatingMenuEditor({ editor }: { editor: Editor }) {
  return <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
    <CommonMenuEditor editor={editor} />
  </FloatingMenu>
}
