import { Dialog } from "@shared/ui";
import Button from "packages/shared-ui/src/components/Button";
import { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import CreateFieldContainer from "./CreateFieldContainer";
import { useCustomFieldStore } from "./store";

export default function CreateField() {
  // const [visible, setVisible] = useState(false)
  const setVisible = useCustomFieldStore(state => state.setVisible)
  const onClick = () => {
    setVisible(true)
  }
  //
  // // reset form data
  // useEffect(() => {
  //   if (visible === false) {
  //     setDisplay(false)
  //   }
  // }, [visible])

  return <>
    <Button onClick={onClick} leadingIcon={
      <HiOutlinePlus />
    } size="sm" />

    {/* <Dialog.Root open={visible} onOpenChange={setVisible}> */}
    {/*   <Dialog.Portal> */}
    {/*     <Dialog.Content position="right" size='sm'> */}
    {/*       <CreateFieldContainer /> */}
    {/*     </Dialog.Content> */}
    {/*   </Dialog.Portal> */}
    {/* </Dialog.Root> */}
  </>
}
