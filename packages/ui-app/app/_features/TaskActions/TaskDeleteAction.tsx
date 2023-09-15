import { useServiceTaskDel } from '@/hooks/useServiceTaskDel'
import { Button, confirmAlert } from '@shared/ui'
import { HiOutlineTrash } from 'react-icons/hi2'

export default function TaskDeleteAction({ id }: { id: string }) {
  const { deleteTask } = useServiceTaskDel()
  const onDelete = () => {
    confirmAlert({
      message: 'Are you sure you want to delete this task ?',
      yes: () => {
        deleteTask(id)
      }
    })
  }
  return <Button onClick={onDelete} leadingIcon={<HiOutlineTrash />} />
}
