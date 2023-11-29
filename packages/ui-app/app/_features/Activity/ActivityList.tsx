import { Activity, ActivityType } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'
import { activityGetAllByTask } from '@/services/activity'
import { messageError, messageWarning } from '@shared/ui'
import ActivityCardAttach from './ActivityCardAttach'
import ActivityCardComment from './ActivityCardComment'
import { useActivityContext } from './context'

interface IActivityList {
  taskId: string
}

//

const ActivityList = () => {
  const { activities } = useActivityContext()

  const renderActivity = useCallback((activity: Activity) => {
    const { type } = activity
    switch (type) {
      case ActivityType.TASK_ATTACHMENT_ADDED:
      case ActivityType.TASK_ATTACHMENT_CHANGED:
      case ActivityType.TASK_ATTACHMENT_REMOVED:
        return <ActivityCardAttach activity={activity} />
      case ActivityType.TASK_COMMENT_CREATED:
      case ActivityType.TASK_COMMENT_CHANGED:
      case ActivityType.TASK_COMMENT_REMOVED:
        return <ActivityCardComment activity={activity} />
      default:
        return null
    }
  }, [])

  return (
    <div>
      {activities.map((activity, idx) => (
        <div key={idx}>{renderActivity(activity)}</div>
      ))}
    </div>
  )
}
export default ActivityList
