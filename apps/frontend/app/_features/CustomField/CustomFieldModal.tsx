import { Dialog } from "@ui-components";
import { useEffect, useState } from "react";
import CreateFieldContainer from "./CreateFieldContainer";
import { useCustomFieldStore } from "./store";

export default function CustomFieldModal() {
  const { visible, setDisplay, setVisible } = useCustomFieldStore(state => ({
    visible: state.visible,
    setVisible: state.setVisible,
    setDisplay: state.setDisplay
  }))

  const [open, setOpen] = useState(false)

  // reset form data
  useEffect(() => {
    setOpen(visible)
    if (visible === false) {
      setDisplay(false)
    }
  }, [visible, setDisplay])

  useEffect(() => {
    if (open === false) {
      setVisible(open)
    }
  }, [open, setVisible])

  return <>
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Content position="right" size='sm'>
          <CreateFieldContainer />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>
}
