import { projectSettingUpdate, projectSettingGet } from '@/services/setting'
import { ProjectSetting } from '@prisma/client'
import { messageError, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import CheckboxControl from 'packages/shared-ui/src/components/Controls/CheckboxControl'
import { useEffect, useRef, useState } from 'react'

enum ESetting {
  OverdueTask = 'overDueTaskStatus',
  TodayTask = 'todayTaskStatus',
  UrgentTask = 'urgentTaskStatus',
}

interface ISetting {
  key: ESetting
  name: string
  isChecked: boolean
}

const defaultProjectSetting: ISetting[] = [
  {
    key: ESetting.OverdueTask,
    name: 'Overdue Task',
    isChecked: false
  },
  {
    key: ESetting.TodayTask,
    name: 'Today Task',
    isChecked: false
  },
  {
    key: ESetting.UrgentTask,
    name: 'Urgent Task',
    isChecked: false
  },
]

const convertProjectSettingToArray = (projectSetting: ProjectSetting) => {
  return defaultProjectSetting.map(item => {
    return {
      ...item,
      isChecked: projectSetting[`${item.key}`]
    }
  })
}

export default function ProjectSettingManager() {
  const { projectId } = useParams()
  const refProjectSetting = useRef<ProjectSetting | null>(null)
  const [listProjectSetting, setListProjectSetting] = useState(
    defaultProjectSetting
  )

  const handleChange = async (checked: boolean, value: ISetting) => {
    if (!refProjectSetting.current) {
      return
    }
    
    const updateSetting = {
      ...refProjectSetting.current,
      [value.key]: checked
    }
    console.log(updateSetting, '----> updateSetting')
    try {
      const setting = (await (
        await projectSettingUpdate(updateSetting)
      ).data.data) as ProjectSetting
      setListProjectSetting(
        convertProjectSettingToArray(setting)
      )
      refProjectSetting.current = setting
      messageSuccess('Update setting successfully ! 🐸')
    } catch (error) {
      messageError('Update setting error ! 😥')
      console.log(error)
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        const setting = (await projectSettingGet(projectId)).data
          .data as ProjectSetting
        refProjectSetting.current = setting
        setListProjectSetting(convertProjectSettingToArray(setting))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <>
      <div className="setting-container border dark:border-gray-700">
        <div className="m-3">
          <div className="mb-3">
            <h3>Project Notifications</h3>
            <span className="text-xs text-gray-500 mt-2 leading-5">
              Set notification defaults to future projects you are a member of
            </span>
          </div>
          {listProjectSetting.map((value, index) => {
            const { isChecked, name } = value
            return (
              <CheckboxControl
                key={index}
                checked={isChecked}
                desc={name}
                onChange={checked => handleChange(checked, value)}
                className="flex"
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
