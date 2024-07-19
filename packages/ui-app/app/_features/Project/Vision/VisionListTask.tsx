import { useTaskStore } from '@/store/task'
import { useVisionContext } from './context'
import ListBoxCreate from '@/components/ListBox/ListBoxCreate'
import { useServiceTaskAdd } from '@/hooks/useServiceTaskAdd'
import { useParams } from 'next/navigation'
import { HiOutlineChevronLeft } from 'react-icons/hi2'
import { Button, Scrollbar } from '@shared/ui'
import { useEffect, useState } from 'react'
import { useUser } from '@goalie/nextjs'


import VisionTaskItemDraggable from './VisionTaskItemDraggable'
import StatusSelectMultiple from '@/components/StatusSelectMultiple'
import { motion } from "framer-motion";
import { HiOutlineX } from 'react-icons/hi'

function VisionTaskCounter({ total, onHide }: { total: number, onHide: () => void }) {
  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 100 }}
    className="w-[30px] border-r dark:border-gray-700 h-full bg-white dark:bg-gray-900 cursor-pointer"
    onClick={onHide}>
    <div className="whitespace-nowrap uppercase text-[11px] font-bold text-gray-600 dark:text-gray-500 transform rotate-90 translate-y-5">
      show task list:{' '}
      <span className="px-1 py-0.5 w-5 rounded-md border dark:border-gray-700">
        {total}
      </span>
    </div>
  </motion.div>
}

export default function VisionListTask() {
  const [hide, setHide] = useState(true)
  const { projectId } = useParams()
  const { selected, setSelected, visions } = useVisionContext()
  const { tasks, taskLoading } = useTaskStore()
  const { user } = useUser()
  const [statusIds, setStatusIds] = useState(['ALL'])
  const { taskCreateOne } = useServiceTaskAdd()

  const includeStatusId = (id: string) => {
    if (statusIds.includes('ALL')) return true

    return statusIds.includes(id)
  }
  const taskWithoutVisions = tasks.filter(t => {
    const statusId = t.taskStatusId || ''
    if (selected) {
      return t.visionId === selected && includeStatusId(statusId)
    }

    // task with selected status and not int current visions
    return includeStatusId(statusId) && !visions.find(v => v.id === t.visionId)
  })

  const onEnter = (v: string) => {
    const userId = user?.id
    if (!v || !userId) {
      return
    }

    taskCreateOne({
      dueDate: new Date(),
      title: v,
      projectId,
      assigneeIds: [userId],
      visionId: selected
    })
  }

  useEffect(() => {
    selected && hide && setHide(false)
  }, [selected])

  if (hide) {
    return <VisionTaskCounter total={taskWithoutVisions.length} onHide={() => setHide(false)} />
  }

  return (
    <motion.div
      drag dragMomentum={false}

      initial={{ opacity: 0, left: '40%', top: 200 }}
      animate={{ opacity: 100, left: '40%', top: 100 }}

      className='fixed shadow-lg cursor-move py-3 w-[300px] border rounded-md dark:border-gray-700 shrink-0 z-40 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md'>

      <div className="">
        <div className="flex px-3 border-b dark:border-gray-700 pb-3 items-center gap-2 justify-between">
          <StatusSelectMultiple noName={true} onChange={val => {
            setStatusIds(val)
          }} value={statusIds} />
          <Button
            onClick={() => {
              setSelected('')
              setHide(true)
            }}
            leadingIcon={<HiOutlineX />}
          />
        </div>
        {taskLoading ? <h2>Loading</h2> : null}
        <Scrollbar style={{ height: '500px' }}>
          <div className='space-y-2 px-3 py-3'>
            {taskWithoutVisions.map((t, index) => {
              return (
                <VisionTaskItemDraggable
                  index={index}
                  key={t.id}
                  title={t.title}
                  statusId={t.taskStatusId || ''}
                  id={t.id}
                />
              )
            })}
          </div>
        </Scrollbar>
        <div className='px-3 border-t dark:border-gray-700 pt-2 space-y-1'>
          <h2 className="text-[12px] uppercase font-bold text-gray-600">
            {!taskWithoutVisions.length
              ? 'No task found'
              : `All tasks: ${taskWithoutVisions.length}`}
          </h2>
          <div className="bg-white rounded-md border shadow-md shadow-indigo-100 dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-900">
            <ListBoxCreate placeholder="Create new task" onEnter={onEnter} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
