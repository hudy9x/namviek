
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { DialogProvider } from "./context"

type DialogRootProps = {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}


export default function DialogRoot({ open, onOpenChange, children }: DialogRootProps) {

  return <DialogProvider value={{
    open,
    onOpenChange
  }}>

    {children}
  </DialogProvider>
}
