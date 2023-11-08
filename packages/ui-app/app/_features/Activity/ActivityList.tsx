import { Activity, ActivityType } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'
import { activityGetAllByTask } from '@/services/activity'
import { messageError, messageWarning } from '@shared/ui'
import ActivityCardAttach from './ActivityCardAttach'
import ActivityCardComment from './ActivityCardComment'
import { ActivityAttachData } from '@shared/models'

interface IActivityList {
  taskId: string
}

//
const fakeData: Partial<Activity>[] = [
  {
    type: ActivityType.TASK_COMMENT_CREATED,
    createdAt: new Date(),
    uid: '64a44b0ae9b966f87f404d79',
    data: {
      content: `        
      <p>Hi everyone! Don’t forget the daily stand up at 8 AM.</p>
        <p><span data-type="mention" data-id="Jennifer Grey"></span> Would you mind to share what you’ve been working on lately? We fear not much happened since Dirty Dancing.
        <p><span data-type="mention" data-id="Winona Ryder"></span> <span data-type="mention" data-id="Axl Rose"></span> Let’s go through your most important points quickly.</p>
        <p>I have a meeting with <span data-type="mention" data-id="Christina Applegate"></span> and don’t want to come late.</p>
        <p>– Thanks, your big boss</p>`
    }
  },
  {
    type: ActivityType.TASK_ATTACHMENT_ADDED,
    createdAt: new Date(),
    uid: '64a44b0ae9b966f87f404d79',
    // data: {
    //   title: 'attach title 1',
    //   content: 'attach content 1'
    // }
    data: {
      title: 'attach title 1',
      content: 'attach content 1',
      attachedFile: {
        name: 'cat-with-mac',
        url: 'https://prideandgroom.com/cdn/shop/articles/funniest_google_searches_about_dogs_1600x.jpg?v=1684247008'
      }
    }
  }
]

const ActivityList = ({ taskId }: IActivityList) => {
  // TODO: fake data
  const [activities, setActivities] = useState<Activity[]>(fakeData)

  const loadActivities = useCallback(() => {
    activityGetAllByTask(taskId).then(res => {
      const { status, error, data } = res.data
      if (status !== 200) {
        messageError(error)
        return false
      }
      setActivities(data)
      return true
    })
  }, [taskId])

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

  // TODO: disabled for fake data
  // useEffect(() => {
  //   loadActivities()
  // }, [loadActivities])

  useEffect(() => {
    setActivities(fakeData)
  }, [fakeData])

  return (
    <div>
      {activities.map((activity, idx) => (
        <div key={idx}>{renderActivity(activity)}</div>
      ))}
    </div>
  )
}
export default ActivityList
