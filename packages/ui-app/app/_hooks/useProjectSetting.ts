import {
  projectSettingAdd,
  projectSettingGet,
  projectSettingUpdate
} from '@/services/setting'
import { ProjectSetting } from '@prisma/client'
import { messageError, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

enum SettingType {
  OverdueTaskStatus = 'overDueTaskStatus',
  TodayTaskStatus = 'todayTaskStatus',
  UrgentTaskStatus = 'urgentTaskStatus'
}

interface ISetting {
  key: SettingType
  name: string
  isChecked: boolean
}

const defaultProjectSetting: ISetting[] = [
  {
    key: SettingType.OverdueTaskStatus,
    name: 'Overdue Task',
    isChecked: false
  },
  {
    key: SettingType.TodayTaskStatus,
    name: 'Today Task',
    isChecked: false
  },
  {
    key: SettingType.UrgentTaskStatus,
    name: 'Urgent Task',
    isChecked: false
  }
]

const convertProjectSettingToArray = (projectSetting: ProjectSetting) => {
  return defaultProjectSetting.map(item => {
    return {
      ...item,
      isChecked: projectSetting[`${item.key}`]
    }
  })
}

export const useProjectSetting = () => {
  const { projectId, orgID } = useParams()
  const refProjectSetting = useRef<ProjectSetting | null>(null)
  const [listProjectSetting, setListProjectSetting] = useState(
    defaultProjectSetting
  )
  const handleUpdateProjectSetting = async (
    checked: boolean,
    value: ISetting
  ) => {
    if (!refProjectSetting.current) {
      return
    }

    const updatedSetting = {
      ...refProjectSetting.current,
      [value.key]: checked
    }
    try {
      const { data } = await projectSettingUpdate(updatedSetting)
      const setting = data.data as ProjectSetting

      setListProjectSetting(convertProjectSettingToArray(setting))
      refProjectSetting.current = setting

      messageSuccess('Update setting successfully! 🐸')
    } catch (error) {
      console.error('Update setting error:', error)
      messageError('Update setting error! 😥')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await projectSettingGet(projectId)
        const defaultProjectSetting = {
          organizationId: orgID,
          projectId: projectId,
          overDueTaskStatus: false,
          todayTaskStatus: false,
          urgentTaskStatus: false
        }
        const newSetting = data.data as ProjectSetting

        if (newSetting) {
          refProjectSetting.current = newSetting
          setListProjectSetting(convertProjectSettingToArray(newSetting))
        } else {
          const { data } = await projectSettingAdd(defaultProjectSetting)
          const setting = data.data as ProjectSetting
          refProjectSetting.current = setting
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [projectId])

  return {
    handleUpdateProjectSetting,
    listProjectSetting
  }
}
