import { useUrl } from '@/hooks/useUrl'
import NotifySettingContainer from './NotifySettingContainer'
import { useEffect, useState } from 'react'
import { projectSettingNotify } from '@/services/projectSettingNotify'
import { Loading } from '@shared/ui'

export default function ProjectNotificationSetting() {
  const { projectId } = useUrl()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const abortCtrl = new AbortController()
    projectSettingNotify.get(projectId, abortCtrl.signal).then(res => {
      console.log(res)
    })
    return () => {
      abortCtrl.abort()
    }
  })
  if (loading) {
    return (
      <div className="setting-container border dark:border-gray-700">
        <Loading />
      </div>
    )
  }
  return <NotifySettingContainer />
}
