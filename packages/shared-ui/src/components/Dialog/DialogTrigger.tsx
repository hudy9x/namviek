import Button from "../Button";
import { useDialogContext } from "./context";

export default function DialogTrigger() {
  const { onOpenChange } = useDialogContext()
  return <Button onClick={() => {
    console.log('click button dialog')
    onOpenChange(true)
  }} title="Open dialog" />
}
