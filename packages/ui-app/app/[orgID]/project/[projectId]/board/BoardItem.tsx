import { ExtendedTask } from '@/store/task'
import { useParams, useRouter } from 'next/navigation'

import { useUrl } from '@/hooks/useUrl'
import PriorityText from '@/components/PriorityText'
import { Loading, Popover, Tooltip, messageWarning } from '@shared/ui'

import differenceInDays from 'date-fns/differenceInDays'
import { useStatusUtils } from '@/hooks/useStatusUtils'
import { StatusType } from '@prisma/client'

import TaskTypeIcon from '@/components/TaskTypeSelect/Icon'
import TaskDate from '../views/TaskDate'
import { HiOutlineCalendar } from 'react-icons/hi2'
import TaskAssignee from '../views/TaskAssignee'
import TaskCheckbox from '@/components/TaskCheckbox'
import { GoTasklist } from 'react-icons/go'
import TaskChecklist from '@/features/TaskChecklist'
import { useMemo } from 'react'

function BoardItemCover({ cover }: { cover: string | null }) {
  if (!cover) return null

  return (
    <div className="max-h-60 -mx-3 bg-gray-50 dark:bg-gray-800 -mt-3 mb-2 rounded-t-md overflow-hidden">
      <img alt="task cover" src={cover} />
    </div>
  )
}


export default function BoardItem({ data }: { data: ExtendedTask }) {
  const { orgID, projectId } = useParams()
  const { replace } = useRouter()
  const { getStatusTypeByTaskId } = useStatusUtils()
  const { getSp } = useUrl()
  const link = `${orgID}/project/${projectId}?mode=${getSp('mode')}&taskId=${data.id
    }`
  const progress = useMemo(() => {
    const done = data.checklistDone || 0
    const todo = data.checklistTodos || 0
    const percent = (done / (todo + done)) * 100
    return isNaN(percent) ? 0 : Math.round(percent)
  }, [JSON.stringify(data)])

  const includeRandID = data.id.includes('TASK-ID-RAND')
  const dateClasses: string[] = []
  const taskStatusType = getStatusTypeByTaskId(data.id)
  const { dueDate } = data
  const onClick = () => {
    if (includeRandID) {
      messageWarning('This task has been creating by server !')
      return
    }
    replace(link)
  }

  const isOverdue = dueDate && taskStatusType !== StatusType.DONE && differenceInDays(new Date(dueDate), new Date()) < 0

  if (isOverdue) {
    dateClasses.push('text-red-400')
  }

  return (
    <div className="board-item relative">
      <BoardItemCover cover={data.cover} />
      <PriorityText type={data.priority || 'LOW'} />
      <Loading.Absolute enabled={includeRandID} />

      <h2 onClick={onClick} className="text-sm dark:text-gray-400 text-gray-600 whitespace-normal hover:underline cursor-pointer space-x-1 active:scale-[97%] transition-all">
        <span>{data.title}</span>
        <TaskTypeIcon size="sm" type={data.type || ''} />

      </h2>
      <div className='board-item-duedate'>
        <HiOutlineCalendar className='w-3 h-3' />
        <TaskDate taskId={data.id} toNow={true} date={data.dueDate ? new Date(data.dueDate) : null} />
      </div>

      <div className="board-item-action">
        <div className='flex items-center gap-2'>
          <Popover
            triggerBy={
              <div>
                {progress > 0 && progress < 100 ?
                  <Tooltip title={`Checklist progress`}>
                    <div className='p-0.5 w-5 h-5 cursor-pointer border dark:border-gray-700 rounded-full text-[10px] text-center animate-pulse'>{progress}</div>
                  </Tooltip>
                  :
                  <GoTasklist className='p-0.5 w-5 h-5 cursor-pointer border dark:border-gray-700 rounded-full' />
                }
              </div>
            }
            content={
              <div className='px-4 pt-4 pb-1 border bg-white dark:bg-gray-900 dark:border-gray-700 rounded-md w-[300px]'>
                <TaskChecklist taskId={data.id} />
              </div>
            }
          />
          <TaskAssignee
            className="no-name"
            taskId={data.id}
            uids={data.assigneeIds}
          />
        </div>
        <TaskCheckbox id={data.id} selected={data.selected} />
      </div>
      {progress ?
        <div className='absolute bottom-0 left-0 w-full rounded-b-md overflow-hidden'>
          <div className={`h-1 ${isOverdue && progress < 100 ? 'bg-red-400' : 'bg-green-400'}`} style={{ width: `${progress}%` }}></div>
        </div>
        : null}
    </div>
  )
}
