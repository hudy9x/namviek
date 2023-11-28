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
      content: `@64a44b0ae9b966f87f404d79 we don't use [www.facebook.com](http://www.facebook.com) for communicating any more!`
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
  },
  {
    type: ActivityType.TASK_COMMENT_CREATED,
    createdAt: new Date(),
    uid: '64a44b0ae9b966f87f404d79',
    data: {
      content: `# Neovim-config\n\n## Lsp-manager\n\n**mason**\n\n## Useful tools\n\n- jk-accelaration\n- lspsaga\n- vim-surround\n- \n\n[My nvim config](http://github.com/huypl53/nvim)\n\n\n\n![uttq-lasso.png](https://trello.com/1/cards/652d372f993addd851f85161/attachments/652feb75474c0ededc31aa97/download/uttq-lasso.png)\n\n---\n\n:stuck_out_tongue_closed_eyes: @64a44b0ae9b966f87f404d79 this could help you!\n\n> Just an IDE…`
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
      setActivities([...data, ...fakeData])
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
  useEffect(() => {
    loadActivities()
  }, [loadActivities])

  // useEffect(() => {
  //   setActivities(fakeData)
  // }, [fakeData])

  return (
    <div>
      {activities.map((activity, idx) => (
        <div key={idx}>{renderActivity(activity)}</div>
      ))}
    </div>
  )
}
export default ActivityList
