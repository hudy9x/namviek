import { ExtendedTask } from '@/store/task'
import { useParams, useRouter } from 'next/navigation'

import { dateFormat } from '@shared/libs'
import MemberAvatar from '@/components/MemberAvatar'
import { useUrl } from '@/hooks/useUrl'
import PriorityText from '@/components/PriorityText'
import { Loading, messageWarning } from '@shared/ui'
import TaskTypeIcon from '@/components/TaskTypeSelect/Icon'

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
  const { getSp } = useUrl()
  // return <div className="">{data.title}</div>
  const link = `${orgID}/project/${projectId}?mode=${getSp('mode')}&taskId=${
    data.id
  }`
  const isRand = data.id.includes('TASK-ID-RAND')

  return (
    <div
      className="board-item relative"
      onClick={() => {
        if (isRand) {
          messageWarning('This task has been creating by server !')
          return
        }
        replace(link)
      }}>
      <BoardItemCover cover={data.cover} />
      <PriorityText type={data.priority || 'LOW'} />
      <Loading.Absolute enabled={isRand} />
      <h2 className="text-sm dark:text-gray-400 text-gray-600 whitespace-normal cursor-pointer space-x-1">
        <span>{data.title}</span>
        <TaskTypeIcon size="sm" type={data.type || ''} />
      </h2>

      <div className="board-item-action">
        {data.dueDate ? (
          <span className="text-gray-400 text-xs">
            {dateFormat(new Date(data.dueDate), 'PP')}
          </span>
        ) : null}
        <MemberAvatar uid={data.assigneeIds[0]} size="md" noName={true} />
      </div>
    </div>
  )
}
