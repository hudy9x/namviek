import { ReactNode } from "react";
import Button from "../Button";
import { useDialogContext } from "./context";

export default function DialogTrigger({ children }: { children?: ReactNode }) {
  const { onOpenChange } = useDialogContext()
  if (!children)
    return <Button onClick={() => {
      console.log('click button dialog')
      onOpenChange(true)
    }} title="Open dialog" />

  return <div onClick={() => {
    onOpenChange(true)
  }}>{children}</div>
}
