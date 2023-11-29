import { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { TbFilterCog } from 'react-icons/tb'
import { useTaskFilter } from './context'
import './style.css'
import TaskFilterAction from './TaskFilterAction'

let timeout = 0
interface ITaskFilterProps {
  searchEnabled?: boolean
  pointEnabled?: boolean
  assigneeEnable?: boolean
  importEnable?: boolean
}
export default function TaskFilter({
  searchEnabled = true,
  pointEnabled = true,
  assigneeEnable = true,
  importEnable = true
}: ITaskFilterProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [txt, setTxt] = useState('')
  const { setFilterValue } = useTaskFilter()

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      console.log('update search term')
      setFilterValue('term', txt)
    }, 250) as unknown as number
  }, [txt])

  const toggleMobileAction = () => {
    const divElem = divRef.current
    if (!divElem) return

    const style = divElem.getAttribute('style') || ''

    if (style.includes('none')) {
      divElem.setAttribute('style', 'display:flex')
    } else {
      divElem.setAttribute('style', 'display:none')
    }

  }

  return (
    <div className="task-filter">
      <div className="flex items-center gap-2">
        {searchEnabled ? (
          <div className="flex items-center gap-2 relative w-full sm:w-auto">
            <AiOutlineSearch className="text-gray-400" />
            <input
              className="text-sm outline-none dark:bg-gray-900 py-3 sm:py-0"
              value={txt}
              onChange={ev => {
                setTxt(ev.target.value)
              }}
              placeholder="Search ..."
            />
            <TbFilterCog onClick={toggleMobileAction} className="absolute top-2 right-2 w-7 h-7 p-1.5 cursor-pointer text-gray-500 sm:hidden" />
          </div>
        ) : null}
      </div>

      <div ref={divRef}>
        <TaskFilterAction className='flex flex-wrap sm:hidden' {...{ pointEnabled, assigneeEnable, importEnable }} />
      </div>
      <TaskFilterAction className='hidden sm:flex' {...{ pointEnabled, assigneeEnable, importEnable }} />
    </div>
  )
}
