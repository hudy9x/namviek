import { Activity, ActivityType } from '@prisma/client'
import { useCallback, useState } from 'react'
import ActivityCardAttach from './ActivityCardAttach'
import ActivityCardComment from './ActivityCardComment'
import { useActivityContext } from './context'
import ActivityLog from './ActivityLog'
import ActivityLogDesc from './ActivityLogDesc'
import ActivitySectionTime from './ActivitySectionTime'

const ActivityList = () => {
  const { activities } = useActivityContext()
  const [visible, setVisible] = useState(false)

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

      case ActivityType.TASK_TITLE_CHANGED:
      case ActivityType.TASK_DESC_CHANGED:
        return <ActivityLogDesc activity={activity} />
      default:
        return <ActivityLog activity={activity} />
    }
  }, [])

  const isExceeded = activities.length > 7

  return (
    <div className="activity-list">
      {activities.slice(0, 7).map((activity, i) => (
        <div key={activity.id || i}>
          {/* <ActivitySectionTime visible={i !== 0} time={activity.createdAt} /> */}
          <ActivitySectionTime time={activity.createdAt} firstItem={i === 0} />
          {renderActivity(activity)}
        </div>
      ))}

      {visible && isExceeded
        ? activities.slice(7, activities.length).map((activity, i) => (
            <div key={activity.id || i}>
              <ActivitySectionTime time={activity.createdAt} />
              {renderActivity(activity)}
            </div>
          ))
        : null}

      {isExceeded ? (
        <div className="text-center">
          <div
            className="btn btn-sm cursor-pointer"
            onClick={() => setVisible(!visible)}>
            {visible ? 'Hide some activities' : 'Show more activities'}
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default ActivityList
