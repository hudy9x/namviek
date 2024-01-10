import { Button } from "@shared/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HiOutlinePlus } from "react-icons/hi2";

export default function AutomateSchedulerList({ openCreateForm }: { openCreateForm: () => void }) {
  return <>
    <Button
      title="Create new"
      onClick={openCreateForm}
      leadingIcon={<HiOutlinePlus />}
      primary
    />
  </>
}
