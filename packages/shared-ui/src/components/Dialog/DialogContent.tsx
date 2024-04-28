import { ReactNode, useEffect } from "react";
import DialogClose from "./DialogClose";
import { useDialogContext } from "./context";

const useEscapeKeyPressed = (func: () => void, unmontFunc?: () => void) => {

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        func()
      }
    }

    document.addEventListener('keyup', handler)

    return () => {
      document.removeEventListener('keyup', handler)
      unmontFunc && unmontFunc()

    }

    // eslint-disable-next-line
  }, [])
}

export default function DialogContent({ children }: { children?: ReactNode }) {

  const { open, onOpenChange } = useDialogContext()

  useEscapeKeyPressed(() => {
    onOpenChange(false)
  })

  if (!open) return null

  return <div className="dialog-container" onClick={(ev) => {
    onOpenChange(false)
  }}>
    <div onClick={ev => {
      ev.stopPropagation()
    }} className="dialog-content size-lg">
      <DialogClose />
      {children}
    </div>
  </div>
}
