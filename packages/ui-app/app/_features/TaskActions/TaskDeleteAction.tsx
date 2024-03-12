import { useServiceTaskDel } from '@/hooks/useServiceTaskDel'
import { Button, confirmAlert } from '@shared/ui'
import localforage from 'localforage'
import { useParams } from 'next/navigation'
import { HiOutlineTrash } from 'react-icons/hi2'

export default function TaskDeleteAction({ id }: { id: string }) {
  const { projectId } = useParams()
  const { deleteTask } = useServiceTaskDel()
  const onDelete = () => {
    confirmAlert({
      title: 'Delete task',
      message:
        'This action cannot be undone. Are you sure you want to delete this task permanently ?',
      yes: () => {
        const key = `TASKLIST_${projectId}`
        deleteTask(id)
        localforage.removeItem(key)
      }
    })
  }
  return <Button onClick={onDelete} leadingIcon={<HiOutlineTrash />} />
}
