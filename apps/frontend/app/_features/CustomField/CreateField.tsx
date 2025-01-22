import Button from "packages/ui-components/src/components/Button";
import { HiOutlinePlus } from "react-icons/hi2";
import { useCustomFieldStore } from "./store";

export default function CreateField() {
  const setVisible = useCustomFieldStore(state => state.setVisible)
  const onClick = () => {
    setVisible(true)
  }

  return <>
    <Button onClick={onClick} leadingIcon={
      <HiOutlinePlus />
    } size="sm" />
  </>
}
