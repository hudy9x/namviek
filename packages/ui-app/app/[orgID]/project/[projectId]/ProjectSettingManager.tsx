import { projectSettingUpdate, projectSettingGet } from '@/services/setting'
import { ProjectSetting } from '@prisma/client'
import { messageError, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import CheckboxControl from 'packages/shared-ui/src/components/Controls/CheckboxControl'
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
        const { data } = await projectSettingGet(projectId);
        const setting = data.data as ProjectSetting;
        
        refProjectSetting.current = setting;
        setListProjectSetting(convertProjectSettingToArray(setting));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
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
  )
}
