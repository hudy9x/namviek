import { dboardComponentDel } from '@/services/dashboard'
import { AiOutlineDelete } from 'react-icons/ai'
import { useOverviewContext } from '../../Project/Overview/context'
import { confirmAlert, messageError, messageSuccess } from '@shared/ui'

export default function DbCompDelete({ id }: { id: string }) {
  const { delComponent } = useOverviewContext()

  const doDelete = () => {
    delComponent(id)
    dboardComponentDel(id).then(res => {
      const { status } = res.data
      if (status !== 200) {
        messageError('Delete failed')
        return
      }

      messageSuccess('Deleted component')
    })
  }
  const onDelete = () => {
    confirmAlert({
      message: 'Are you sure you want to delete this component ?',
      yes: () => {
        doDelete()
      }
    })
  }
  return (
    <div className="absolute top-3 right-3 z-10" onClick={onDelete}>
      <AiOutlineDelete className="text-gray-400" />
    </div>
  )
}
