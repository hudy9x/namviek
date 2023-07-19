import { messageError, randomId, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import { projectStatusAdd } from '../../../../../../services/status'
import { useProjectStatusStore } from '../../../../../../store/status'
import { KeyboardEvent, useRef } from 'react'
import { TaskStatus } from '@prisma/client'
import { DEFAULT_COLOR } from './type'
import { AiOutlinePlus } from 'react-icons/ai'
import { StatusDnDContainer } from './StatusDnDContainer'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const ProjectStatus = () => {
  const params = useParams()
  const inputAddRef = useRef<HTMLInputElement>(null)
  const { statuses, addStatus, updateStatus } = useProjectStatusStore()

  const onPressEnter = (e: KeyboardEvent<HTMLDivElement>) => {
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

  return (
    <div className="w-full">
      <div className="setting-container border">
        <DndProvider backend={HTML5Backend}>
          <StatusDnDContainer />
        </DndProvider>
        <div className="relative flex items-center bg-gray-50 rounded-b-lg">
          <AiOutlinePlus className="absolute top-3.5 left-4 text-gray-500" />
          <input
            ref={inputAddRef}
            className="bg-transparent w-full pl-12 text-gray-500 text-sm pr-8 py-3 outline-none"
            placeholder="Hit `Enter` to add a new status"
            onKeyDown={onPressEnter}
          />
        </div>
      </div>
    </div>
  )
}
