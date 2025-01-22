import { Field } from "@prisma/client";
import { HiOutlinePencil } from "react-icons/hi2";
import { useCustomFieldStore } from "./store";

export default function EditCustomField({ data }: { data: Field }) {
  const setEditCustomField = useCustomFieldStore(state => state.setEditData)
  return <HiOutlinePencil className="cursor-pointer shrink-0" onClick={() => {
    setEditCustomField(data)
    console.log(data)
  }} />
}
