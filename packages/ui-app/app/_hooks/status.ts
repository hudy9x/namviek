import { KeyboardEvent, RefObject } from 'react'
import { useParams } from 'next/navigation'
import { TaskStatus } from '.prisma/client'
import { projectStatusAdd } from 'packages/ui-app/services/status'
import { messageError, messageSuccess, randomId } from '@shared/ui'
import { useProjectStatusStore } from 'packages/ui-app/store/status'
import { DEFAULT_COLOR } from '../[orgName]/project/[projectId]/settings/status/type'
import { StatusType } from '@prisma/client'

interface Props {
  currentColor?: string
}

export const useStatus = ({ currentColor }: Props) => {
  const { statuses, updateStatus, addStatus } = useProjectStatusStore()
  const params = useParams()

  const updateStatusToServer = (fakeId: string, newTaskStatus: TaskStatus) => {
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

  const createNewStatus = (
    e: KeyboardEvent<HTMLDivElement>,
    inputRef: RefObject<HTMLInputElement>
  ) => {
    if (e.key !== 'Enter') return

    if (!inputRef) return messageError('Input is undefined')
    const target = inputRef.current

    if (!target || !target.value) {
      messageError('Status must not be empty')
      return
    }

    if (!inputRef.current) {
      messageError('Invalid input')
      return
    }

    const projectId = params.projectId
    const fakeId = randomId()
    const order = statuses.length
    const newTaskStatus: TaskStatus = {
      id: fakeId,
      name: target.value,
      color: currentColor || DEFAULT_COLOR,
      order,
      projectId,
      type: StatusType.TODO
    }
    target.value = ''
    addStatus(newTaskStatus)
    updateStatusToServer(fakeId, newTaskStatus)
  }

  return {
    createNewStatus
  }
}
