import { Dispatch, SetStateAction, createContext, useContext } from "react";

type DialogContextProps = {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

export const DialogContext = createContext<DialogContextProps>({
  open: false,
  onOpenChange: () => { console.log(1) }
})

export const DialogProvider = DialogContext.Provider

export const useDialogContext = () => {
  const context = useContext(DialogContext)
  return context
}
