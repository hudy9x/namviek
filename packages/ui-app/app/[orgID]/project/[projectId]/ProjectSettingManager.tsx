import { useProjectSetting } from '@/hooks/useProjectSetting'
import CheckboxControl from 'packages/shared-ui/src/components/Controls/CheckboxControl'

export default function ProjectSettingManager() {
  const { handleUpdateProjectSetting, listProjectSetting } = useProjectSetting()

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
              onChange={checked => handleUpdateProjectSetting(checked, value)}
              className="flex"
            />
          )
        })}
      </div>
    </div>
  )
}
