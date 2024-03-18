import { useUrl } from '@/hooks/useUrl'
import NotifySettingContainer from './NotifySettingContainer'
import { useEffect, useState } from 'react'
import { projectSettingNotify } from '@/services/projectSettingNotify'
import { Loading } from '@shared/ui'
import { ProjectSettingNotification } from '@prisma/client'

export default function ProjectNotificationSetting() {
  const { projectId } = useUrl()
  const [data, setData] = useState({
    loading: true,
    overdue: false,
    taskChanges: false,
    remind: false
  })

  const setLoading = (stt: boolean) => {
    setData(prev => ({ ...prev, loading: stt }))
  }

  useEffect(() => {
    const abortCtrl = new AbortController()

    if (projectId) {
      setLoading(true)
      console.log('get projectId', projectId)
      projectSettingNotify
        .get(projectId, abortCtrl.signal)
        .then(res => {
          const { data } = res.data
          const { overdue, taskChanges, remind } =
            data as ProjectSettingNotification

            console.log('remind', remind)

          setData({
            overdue: !!overdue,
            taskChanges: !!taskChanges,
            remind: !!remind,
            loading: false
          })

          console.log('project notify setting', data)
        })
        .catch(err => {
          setLoading(false)
        })
    }
    return () => {
      setLoading(false)
      abortCtrl.abort()
    }
  }, [projectId])

  if (data.loading) {
    return (
      <div className="setting-container p-4 border dark:border-gray-700">
        <Loading title="Getting your settings ..." />
      </div>
    )
  }

  return (
    <NotifySettingContainer
      taskChanges={data.taskChanges}
      overdue={data.overdue}
      remind={data.remind}
    />
  )
}
