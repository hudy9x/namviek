
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react"
import { DialogProvider } from "./context"

type DialogRootProps = {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

declare global {
  interface Window {
    stopEscapeKeyCloseModal: boolean
  }
}

export default function DialogRoot({ open, onOpenChange, children }: DialogRootProps) {


  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (window.stopEscapeKeyCloseModal) {
        ev.preventDefault()
        return;
      }

      if (ev.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)

    }

  }, [onOpenChange, open])

  return <DialogProvider value={{
    open,
    onOpenChange
  }}>

    {children}
  </DialogProvider>
}
