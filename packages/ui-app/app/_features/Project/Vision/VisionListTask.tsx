import { useTaskStore } from '@/store/task'
import VisionTaskItem from './VisionTaskItem'
import { useVisionContext } from './context'
import ListBoxCreate from '@/components/ListBox/ListBoxCreate'
import { useServiceTaskAdd } from '@/hooks/useServiceTaskAdd'
import { useParams } from 'next/navigation'
import { HiOutlineChevronLeft } from 'react-icons/hi2'
import { Button } from '@shared/ui'
import { useEffect, useState } from 'react'

export default function VisionListTask() {
  const [hide, setHide] = useState(true)
  const { projectId } = useParams()
  const { selected, setSelected } = useVisionContext()
  const { tasks, taskLoading } = useTaskStore()
  const { taskCreateOne } = useServiceTaskAdd()
  const taskWithoutVisions = tasks.filter(t => {
    if (selected) {
      return t.visionId === selected
    }
    return !t.visionId
  })

  const onEnter = (v: string) => {
    if (!v) {
      return
    }

    taskCreateOne({
      dueDate: new Date(),
      title: v,
      projectId,
      visionId: selected
    })
  }

  useEffect(() => {
    selected && hide && setHide(false)
  }, [selected])

  if (hide) {
    return (
      <div
        className="w-[30px] h-full bg-white dark:bg-gray-900 cursor-pointer"
        onClick={() => setHide(false)}>
        <div className="whitespace-nowrap uppercase text-[11px] font-bold text-gray-600 dark:text-gray-500 transform rotate-90 translate-y-5">
          show task list:{' '}
          <span className="px-1 py-0.5 w-5 rounded-md border dark:border-gray-700">
            {taskWithoutVisions.length}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 w-[300px] shrink-0">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[12px] uppercase font-bold text-gray-600">
            {!taskWithoutVisions.length
              ? 'No task found'
              : `All tasks: ${taskWithoutVisions.length}`}
          </h2>
          <Button
            onClick={() => {
              setSelected('')
              setHide(true)
            }}
            size="sm"
            leadingIcon={<HiOutlineChevronLeft />}
          />
        </div>
        {taskLoading ? <h2>Loading</h2> : null}
        {taskWithoutVisions.map((t, index) => {
          return (
            <VisionTaskItem
              key={t.id}
              title={t.title}
              statusId={t.taskStatusId || ''}
              id={t.id}
            />
          )
        })}
        <div className="bg-white rounded-md border shadow-md shadow-indigo-100 dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-900">
          <ListBoxCreate placeholder="Create new task" onEnter={onEnter} />
        </div>
      </div>
    </div>
  )
}
