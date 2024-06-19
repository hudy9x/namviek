import { HiOutlinePlus } from 'react-icons/hi2'
import { useServiceTaskAdd } from '@/hooks/useServiceTaskAdd'
import { Task } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useRef } from 'react'

interface ISubtaskAddProps {
  parentTaskId: string
}

export default function SubtaskAdd({ parentTaskId }: ISubtaskAddProps) {
  const inpRef = useRef<HTMLInputElement>(null)
  const { taskCreateOne } = useServiceTaskAdd({ parentTaskId })
  const { projectId } = useParams()

  const onEnter = (value: string) => {
    inpRef.current && (inpRef.current.value = '')
    const data: Partial<Task> = {
      dueDate: new Date(),
      title: value,
      projectId,
      parentTaskId
    }

    taskCreateOne(data)
  }

  return (
    <div className="checklist-item">
      <HiOutlinePlus />
      <input
        className="checklist-input"
        ref={inpRef}
        onKeyPress={ev => {
          ev.stopPropagation()
          const target = ev.target as HTMLInputElement

          if (ev.key === 'Enter') {
            console.log(target.value)
            onEnter(target.value)
            ev.preventDefault()
          }
        }}
        placeholder="Create new sub task"
      />
    </div>
  )
}
