import { Task } from '@prisma/client'
import { useState } from 'react'
import { HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi2'

const TeamMemberStatusTask = ({
  color,
  name,
  tasks
}: {
  name: string
  tasks: Task[]
  color: string
}) => {
  const [show, setShow] = useState(false)
  const total = tasks && tasks.length ? tasks.length : 0

  const onShow = () => {
    if (!total) return
    setShow(prev => !prev)
  }
  return (
    <div className="">
      <div
        className={`flex items-center gap-1 text-sm font-medium cursor-pointer mb-1`}
        onClick={onShow}
        style={{
          color: color
        }}>
        {show ? <HiOutlineChevronDown /> : <HiOutlineChevronRight />}
        {name}
        {total ? (
          <span className="text-xs rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 px-2 text-gray-400">
            {total}
          </span>
        ) : null}
      </div>

      {show && tasks && tasks.length ? (
        <div className="space-y-1 mb-2 dark:text-gray-400">
          {tasks.slice(0, 10).map(item => (
            <div
              key={item.id}
              className="flex items-center gap-3 border px-2 py-1 rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 ">
              <span className="col-span-4 truncate text-sm" title={item.title}>
                {item.title}
              </span>
            </div>
          ))}
          {tasks.length > 10 ? (
            <div className="flex items-center gap-3 border px-2 py-1 rounded-md bg-white dark:bg-gray-900  dark:border-gray-700 ">
              <span className="col-span-4 truncate text-sm">
                +{tasks.length - 10} more
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default TeamMemberStatusTask
