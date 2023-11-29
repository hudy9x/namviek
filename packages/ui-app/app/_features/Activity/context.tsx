import { activityGetAllByTask, activityUpdate } from '@/services/activity'
import { Activity, ActivityType } from '@prisma/client'
import { messageError } from '@shared/ui'
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

interface IActivityContext {
  taskId: string
  setTaskId: (taskId: string) => void
  activities: Activity[]
  addActivity: (activiyy: Activity) => void
  updateActivity: (activity: Activity) => void
  removeActivity: (id: string) => void
}

const ActivityContext = createContext<IActivityContext>({
  taskId: '',
  setTaskId: () => {
    console.log(1)
  },
  activities: [],
  addActivity: () => {
    console.log(1)
  },
  removeActivity: () => {
    console.log(1)
  }
})

export const ActivityContextProvider = ({ children }: PropsWithChildren) => {
  const [taskId, setTaskId] = useState('')
  const [activities, setActivities] = useState<Activity[]>([])

  const addActivity = useCallback((activity: Activity) => {
    setActivities(prev => [activity, ...prev])
  }, [])

  const removeActivity = useCallback(
    (id: string) => [...activities.filter(activity => activity.id !== id)],
    [activities]
  )

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

  // TODO: disabled for fake data
  useEffect(() => {
    loadActivities()
  }, [loadActivities])

  const updateActivity = useCallback(
    (updateActivity: Activity) => {
      const i = activities.findIndex(({ id }) => id === updateActivity.id)
      if (i !== -1) {
        const newActivities = [...activities]
        newActivities[i] = updateActivity
        setActivities(newActivities)
        activityUpdate(updateActivity)
          .then(res => {
            const { data, status } = res.data
          })
          .catch(error => {
            console.log({ error })
          })
      }
    },
    [activities]
  )
  return (
    <ActivityContext.Provider
      value={{
        taskId,
        setTaskId: (id: string) => setTaskId(id),
        addActivity,
        removeActivity,
        activities,
        updateActivity
      }}>
      {children}
    </ActivityContext.Provider>
  )
}

export const useActivityContext = () => {
  return useContext(ActivityContext)
}

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
