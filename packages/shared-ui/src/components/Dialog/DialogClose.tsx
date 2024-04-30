import { Button } from "@shared/ui"
import { useDialogContext } from "./context"
import { MdClose } from "react-icons/md"

export default function DialogClose() {
  const { onOpenChange } = useDialogContext()

  return <Button
    className="dialog-close cursor-pointer z-10"
    leadingIcon={<MdClose />}
    title=""
    onClick={(ev) => {
      ev.preventDefault();
      onOpenChange(false)
    }} />
}
