import { TaskStatus } from '@prisma/client'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { ReactNode, useCallback, useRef } from 'react'
import { KEY } from './type'
import { useProjectStatusStore } from '../../../../../../store/status'
import { projectStatusUpdateOrder } from '../../../../../../services/status'
import { messageError, messageSuccess } from '@shared/ui'

interface IItemStatus {
  status: TaskStatus
  index: number
  children: ReactNode
}

export default function StatusItemDnD({
  status,
  index,
  children
}: IItemStatus) {
  const ref = useRef<HTMLDivElement>(null)
  const { swapOrder, statuses } = useProjectStatusStore()

  const updateStatusOrder = useCallback(() => {
    const newOrders = statuses.map(stt => ({ id: stt.id, order: stt.order }))

    projectStatusUpdateOrder(newOrders).then(result => {
      const { status, data } = result.data

      if (status !== 200) {
        messageError('Sync error !')
        return
      }

      messageSuccess('Synced')
    })
  }, [statuses])

  const [{ handlerId }, drop] = useDrop({
    accept: KEY,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    drop(item: any, monitor: DropTargetMonitor) {
      updateStatusOrder()
    },
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY! < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY! > hoverMiddleY) {
        return
      }

      // swap status's order
      swapOrder(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: KEY,
    item: () => {
      const id = status.id
      return { id, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  return (
    <div
      data-handler-id={handlerId}
      ref={ref}
      className="relative flex items-center group pl-3.5">
      {children}
    </div>
  )
}
