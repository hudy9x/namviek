import { messageError, randomId, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import {
  projectStatusAdd,
  projectStatusUpdate
} from 'packages/ui-app/services/status'
import { useProjectStatusStore } from 'packages/ui-app/store/status'
import { KeyboardEvent, useRef } from 'react'
import { TaskStatus } from '@prisma/client'
import { ItemStatus } from './ItemStatus'
import { DEFAULT_COLOR } from './type'
import { AiOutlinePlus } from 'react-icons/ai'

export const ProjectStatus = () => {
  const params = useParams()
  const inputAddRef = useRef<HTMLInputElement>(null)
  const {
    statuses,
    addStatus,
    updateStatus,
    addAllStatuses
  } = useProjectStatusStore()

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return

    if (!inputAddRef) return messageError('Input is undefined')
    const target = inputAddRef.current

    if (!target || !target.value) {
      messageError('Status must not be empty')
      return
    }

    if (!inputAddRef.current) {
      messageError('Invalid input')
      return
    }

    createNewStatus(target)
  }

  const createNewStatus = (target: HTMLInputElement) => {
    const projectId = params.projectId
    const fakeId = randomId()
    const order = statuses.length
    const newTaskStatus: TaskStatus = {
      id: fakeId,
      name: target.value,
      color: DEFAULT_COLOR,
      order,
      projectId
    }
    target.value = ''
    addStatus(newTaskStatus)

    projectStatusAdd(newTaskStatus)
      .then(res => {
        const { status, data } = res.data
        if (status !== 200) {
          return
        }
        messageSuccess('Create new status successfully')
        updateStatus(fakeId, data as TaskStatus)
      })
      .catch(err => {
        console.log(`Create task status`, err)
      })
  }

  const moveItem = async (dragIndex: number, hoverIndex: number) => {
    let updateStatus = [...statuses]
    const draggedItem = updateStatus[dragIndex]; 
    updateStatus.splice(dragIndex, 1);
    updateStatus.splice(hoverIndex, 0, draggedItem);
    
    const dragTaskStatus: TaskStatus = {
      ...updateStatus[dragIndex],
      order: dragIndex
    }
    
    const hoverTaskStatus: TaskStatus = {
      ...updateStatus[hoverIndex],
      order: hoverIndex
    }
    
    addAllStatuses(updateStatus)
    await projectStatusUpdate(dragTaskStatus)
    await projectStatusUpdate(hoverTaskStatus)
  }



  return (
    <div className="w-full ml-7">
      <div className="setting-container">
        {statuses.map((status, index) => (
          <ItemStatus status={status} index={index} moveItem={moveItem} key={status.id} />
        ))}
        <div className="relative flex items-center bg-gray-50 rounded-b-lg">
          <AiOutlinePlus className="absolute top-3.5 left-4 text-gray-500" />
          <input
            ref={inputAddRef}
            className="bg-transparent w-full pl-12 text-gray-500 text-sm pr-8 py-3 outline-none"
            placeholder="Create Status"
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </div>
  )
}
