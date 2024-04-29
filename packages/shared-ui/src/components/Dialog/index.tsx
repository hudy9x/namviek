import DialogClose from "./DialogClose"
import DialogContent from "./DialogContent"
import DialogPortal from "./DialogPortal"
import DialogRoot from "./DialogRoot"
import DialogTitle from "./DialogTitle"
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
Dialog.Title = DialogTitle

export default Dialog

