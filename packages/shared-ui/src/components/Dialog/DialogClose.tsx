import { Button } from "@shared/ui"
import { useDialogContext } from "./context"
import { MdClose } from "react-icons/md"
import { useEffect } from "react"

export default function DialogClose() {
  const { onOpenChange, open } = useDialogContext()

  // useEffect(() => {
  //   const handler = (ev: KeyboardEvent) => {
  //     // console.log(window.stopEscapeKeyCloseModal)
  //     // if (window.stopEscapeKeyCloseModal) {
  //     //   ev.preventDefault()
  //     //   return
  //     // }
  //
  //     if (ev.key === 'Escape' && open) {
  //       onOpenChange(false)
  //     }
  //   }
  //
  //   document.addEventListener('keyup', handler)
  //
  //   return () => {
  //     document.removeEventListener('keyup', handler)
  //
  //   }
  //
  // }, [onOpenChange, open])

  return <Button
    className="dialog-close cursor-pointer z-10"
    leadingIcon={<MdClose />}
    title=""
    onClick={(ev) => {
      ev.preventDefault();
      onOpenChange(false)
    }} />
  // return <span onClick={setVisible} className='modal-close cursor-pointer z-10'>
  //   <MdClose />
  // </span>
}
