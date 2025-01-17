import { useDataFetcher } from "@/components/DataFetcher/useDataFetcher";
import { projectGridSv } from "@/services/project.grid";
import { Button, confirmAlert, messageSuccess } from "@ui-components";
import { HiOutlineTrash } from "react-icons/hi2";

export default function GridDeleteBtn({ rowId }: { rowId: string }) {
  const { deleteRow } = useDataFetcher()

  const onDelete = () => {
    confirmAlert({
      message: 'Are you sure you want to delete this row ?',
      yes: () => {
        deleteRow(rowId)
        projectGridSv.delete([rowId]).then(res => {
          console.log(res)
          messageSuccess('Delete already')
        })
      }
    })
  }

  return <Button size="sm" leadingIcon={<HiOutlineTrash />} onClick={onDelete} />
}
