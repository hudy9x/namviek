import { DropdownMenu } from "@shared/ui";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function ProjectViewUpdate({ id }: { id: string }) {

  return <DropdownMenu.Item
    onClick={() => {
      console.log('a', id)
    }}
    icon={<HiOutlinePencilSquare />}
    title='Update'
  />
}
