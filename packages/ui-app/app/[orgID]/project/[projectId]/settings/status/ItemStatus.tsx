import { TaskStatus } from '@prisma/client'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import {
  projectStatusDel,
  projectStatusUpdate
} from '../../../../../../services/status'
import { useProjectStatusStore } from '../../../../../../store/status'
import { KeyboardEvent, useRef } from 'react'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { Popover } from 'packages/shared-ui/src/components/Controls'
import { KEY, colors } from './type'
import { IoIosClose } from 'react-icons/io'
import { confirmAlert, messageError, messageSuccess } from '@shared/ui'

interface IItemStatus {
  status: TaskStatus
  index: number
  moveItem: (dragIndex: number, hoverIndex: number) => void
}

export const ItemStatus = ({ status, index, moveItem }: IItemStatus) => {
  const { updateStatus, delStatus } = useProjectStatusStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const colorRef = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: KEY,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
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

      moveItem(dragIndex, hoverIndex)
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

  const handleDelete = async (status: TaskStatus) => {
    confirmAlert({
      message:
        `All tasks with ${status.name} status will be moved to the backlog after this status is deleted. Are you sure you want to delete it?`,
      yes: () => {
        const { id } = status

        try {
          delStatus(id)
          projectStatusDel(id)
        } catch (error) {
          console.log(error)
          messageError('Delete status successfully')
        }
      }
    })
  }

  const handleUpdateName = async (
    e: KeyboardEvent<HTMLDivElement>,
    oldStatus: TaskStatus
  ) => {
    if (e.key !== 'Enter') return

    const target = e.target as HTMLInputElement
    const id = status.id
    const newStatus = {
      ...oldStatus,
      name: target.value
    }
    updateStatus(id, newStatus)
    inputRef?.current?.blur()
    messageSuccess('Update status successfully')

    await updateError(oldStatus, newStatus)
  }

  const updateError = async (oldStatus: TaskStatus, newStatus: TaskStatus) => {
    const id = status.id
    await projectStatusUpdate(newStatus).catch(err => {
      console.log(`Update status failed: ${err}\nRollback to old value`)
      messageError('Status has been failed to sync ! 😥')
      updateStatus(id, oldStatus)
    })
  }

  const handleUpdateColor = async (oldStatus: TaskStatus, color: string) => {
    const id = status.id
    const newStatus = {
      ...oldStatus,
      color
    }

    try {
      updateStatus(id, newStatus)
      await updateError(oldStatus, newStatus)
    } catch (error) {
      messageError('Update color error')
    }
  }

  drag(drop(ref))

  return (
    <div
      data-handler-id={handlerId}
      ref={ref}
      className="relative flex items-center group pl-3.5">
      <div className="flex items-center gap-3">
        <div className="text-xl text-gray-500 cursor-grabbing">
          <HiOutlineBars3 className="text-gray-500" />
        </div>
        <Popover
          triggerBy={
            <div
              style={{ backgroundColor: status.color }}
              className="w-4 h-4 shrink-0 rounded cursor-pointer hover:opacity-90"></div>
          }
          content={
            <div className="grid grid-cols-6 gap-2 p-2 rounded bg-white border border-gray-30">
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  onClick={() => handleUpdateColor(status, color)}
                  className="w-4 h-4 cursor-pointer rounded"></div>
              ))}
            </div>
          }
        />
        <input
          ref={inputRef}
          className="outline-none bg-transparent w-full text-gray-500 text-sm pr-8 py-3"
          onKeyDown={e => handleUpdateName(e, status)}
          defaultValue={status.name}
        />
      </div>
      <div className="absolute right-3 gap-2 hidden group-hover:flex ">
        <IoIosClose
          onClick={() => handleDelete(status)}
          className="cursor-pointer w-5 h-5 bg-gray-100 hover:bg-red-100 hover:text-red-400 rounded-md text-gray-500"
        />
      </div>
    </div>
  )
}
