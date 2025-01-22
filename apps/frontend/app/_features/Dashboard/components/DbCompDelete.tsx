import { dboardComponentDel } from '@/services/dashboard'
import { AiOutlineDelete } from 'react-icons/ai'
import { useOverviewContext } from '../../Project/Overview/context'
import { Button, confirmAlert, messageError, messageSuccess } from '@ui-components'
import { MouseEvent } from 'react'

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
  const onDelete = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation()

    confirmAlert({
      message: 'Are you sure you want to delete this component ?',
      yes: () => {
        doDelete()
      }
    })
  }
  return (
    <Button
      size='sm'
      leadingIcon={
        <AiOutlineDelete style={{ color: '#ff7777' }} />
      } className="" onClick={onDelete} />
  )
}
