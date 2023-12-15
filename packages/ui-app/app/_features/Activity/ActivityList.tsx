import { Activity, ActivityType } from '@prisma/client'
import { useCallback } from 'react'
import ActivityCardAttach from './ActivityCardAttach'
import ActivityCardComment from './ActivityCardComment'
import { useActivityContext } from './context'
import ActivityLog from './ActivityLog'

const ActivityList = () => {
  const { activities } = useActivityContext()
  const renderActivity = useCallback((activity: Activity) => {
    const { type } = activity
    switch (type) {
      case ActivityType.TASK_ATTACHMENT_ADDED:
      case ActivityType.TASK_ATTACHMENT_REMOVED:
        return <ActivityCardAttach activity={activity} />
      case ActivityType.TASK_COMMENT_CREATED:
      case ActivityType.TASK_COMMENT_CHANGED:
      case ActivityType.TASK_COMMENT_REMOVED:
        return <ActivityCardComment activity={activity} />
      default:
        return <ActivityLog activity={activity} />
    }
  }, [])

  return (
    <div className="activity-list">
      {activities.map((activity, i) => (
        <div key={activity.id || i}>{renderActivity(activity)}</div>
      ))}
    </div>
  )
}
export default ActivityList
