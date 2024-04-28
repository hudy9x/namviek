import DialogClose from "./DialogClose"
import DialogContent from "./DialogContent"
import DialogPortal from "./DialogPortal"
import DialogRoot from "./DialogRoot"
import DialogTrigger from "./DialogTrigger"

import "./style.css"

function Dialog() {
  return <div></div>
}

Dialog.Root = DialogRoot
Dialog.Trigger = DialogTrigger
Dialog.Portal = DialogPortal
Dialog.Close = DialogClose
Dialog.Content = DialogContent

export default Dialog

