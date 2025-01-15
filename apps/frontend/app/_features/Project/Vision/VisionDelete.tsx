import { Button, confirmAlert } from '@shared/ui'
import { HiOutlineTrash } from 'react-icons/hi2'
import { useVisionContext } from './context'

export default function VisionDelete({ id }: { id: string }) {
  const { deleteVision } = useVisionContext()
  const onDelete = () => {
    confirmAlert({
      message:
        'This action can not be undoned. Are u sure you want to delete this vision ?',
      yes: () => {
        deleteVision(id)
      }
    })
  }
  return (
    <Button
      leadingIcon={<HiOutlineTrash />}
      onClick={ev => {
        ev.stopPropagation()
        onDelete()
      }}
    />
  )
}
