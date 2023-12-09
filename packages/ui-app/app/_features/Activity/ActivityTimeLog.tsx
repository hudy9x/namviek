import isSameDay from 'date-fns/isSameDay'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface IActivityTimeLog {
  edited?: boolean
  time: Date
  url?: string
  activityId?: string
}

export function ActivityTimeLog({
  time,
  edited,
  url,
  activityId
}: IActivityTimeLog) {
  const router = useRouter()
  const { orgID, projectId } = useParams()
  const sp = useSearchParams()
  const mode = sp.get('mode')
  const taskId = sp.get('taskId')
  const [focused, setFocused] = useState(false)

  // const handleTimeClick =
  //   () => {
  //     setFocused(prev => {
  //       console.log({ activityId, prev, orgID, projectId, mode })
  //       activityId &&
  //         !prev &&
  //         router.replace(
  //           `${orgID}/project/${projectId}?mode=${mode}&taskId=${taskId}&activity=${activityId}`
  //         )
  //
  //       activityId &&
  //         prev &&
  //         router.replace(
  //           `${orgID}/project/${projectId}?mode=${mode}&taskId=${taskId}`
  //         )
  //
  //       return !prev
  //     })
  //   }

  let displayedTime: string

  if (isSameDay(time, new Date())) {
    displayedTime = time.toLocaleTimeString()
  } else
    displayedTime = time.toLocaleString('en-US', {
      dateStyle: 'short',
      timeStyle: 'short'
    })

  return (
    <Link
      className="hover:underline cursor-pointer text-xs"
      href={`${orgID}/project/${projectId}?mode=${mode}&taskId=${taskId}&activity=${activityId}`}>
      {`${displayedTime}${edited ? ' (edited)' : ''}`}
    </Link>
  )
}
