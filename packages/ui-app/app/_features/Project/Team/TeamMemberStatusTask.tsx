import { Task } from '@prisma/client'
import { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'

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

  const onShow = () => {
    setShow(prev => !prev)
  }
  return (
    <div className="">
      <div
        className={`flex gap-4 items-center font-semibold `}
        style={{
          color: color
        }}>
        {show ? (
          <HiChevronUp className="w-5 h-5 cursor-pointer" onClick={onShow} />
        ) : (
          <HiChevronDown className="w-5 h-5 cursor-pointer" onClick={onShow} />
        )}
        {name}
      </div>

      {show ? (
        <div>
          {tasks.map(item => (
            <div key={item.id} className="grid grid-cols-5 gap-4 items-center">
              <div
                className={`h-2 w-2 bg-[${color}]`}
                style={{
                  backgroundColor: color
                }}></div>
              {/* to do: link task detail here */}
              <span className="col-span-4 truncate" title={item.title}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default TeamMemberStatusTask
