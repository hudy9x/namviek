import { activityGetAllByTask, activityUpdate } from '@/services/activity'
import { Activity, ActivityType } from '@prisma/client'
import { messageError, messageSuccess } from '@shared/ui'
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import compareAsc from 'date-fns/compareAsc'

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
  },
  updateActivity: () => {
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
    activityGetAllByTask(taskId)
      .then(res => {
        const { status, error, data } = res.data
        if (status !== 200) {
          messageError(error)
          return false
        }
        if (!Array.isArray(data)) throw Error
        data.sort((a, b) =>
          compareAsc(new Date(b.createdAt), new Date(a.createdAt))
        )
        // console.log({ loadActivities: data })
        setActivities([...data, ...fakeData])
        return true
      })
      .catch(error => {
        messageError(error)
      })
  }, [taskId])

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
            messageSuccess('Update activity successfully!')
          })
          .catch(error => {
            console.log({ error })
            messageError(error)
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
  return { ...useContext(ActivityContext) }
}

const fakeData: Partial<Activity>[] = [
  {
    type: ActivityType.TASK_ATTACHMENT_ADDED,
    createdAt: new Date(2023, 11, 20),
    uid: '64a44b0ae9b966f87f404d79',
    data: {
      title: 'attach title 1',
      content: 'attach content 1',
      attachedFile: {
        name: 'cat-with-mac',
        url: 'https://prideandgroom.com/cdn/shop/articles/funniest_google_searches_about_dogs_1600x.jpg?v=1684247008'
      }
    }
  }
  // {
  //   type: ActivityType.TASK_COMMENT_CREATED,
  //   createdAt: new Date(),
  //   uid: '64a44b0ae9b966f87f404d79',
  //   data: {
  //     content: `
  //       <p><span data-type="mention" data-label="Winona Ryder" data-id="2"></span> <span data-type="mention" data-label="Axl Rose" data-id="4"></span> Let’s go through your most important points quickly.</p>
  //       <p>– Thanks, your big boss</p>
  //     `
  //   }
  // }
]
