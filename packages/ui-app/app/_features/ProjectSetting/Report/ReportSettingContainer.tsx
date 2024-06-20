import { projectSettingReport } from "@/services/projectSettingReport";
import { Switch, messageSuccess } from "@shared/ui";
import { useState } from "react";

export default function ReportSettingContainer({ id, countProjectTask, countMemberTask }: {
  id: string
  countProjectTask: boolean
  countMemberTask: boolean
}) {
  const [projectSetting, setProjectSetting] = useState(countProjectTask)
  const [memberSetting, setMemberSetting] = useState(countMemberTask)

  const onChange = async (name: 'project' | 'member', val: boolean) => {
    let newProjectSetting = projectSetting
    let newMemberSetting = memberSetting
    if (name === 'project') {
      newProjectSetting = val
    }

    if (name === 'member') {
      newMemberSetting = val
    }

    setProjectSetting(newProjectSetting)
    setMemberSetting(newMemberSetting)

    projectSettingReport.update({
      projectId: id,
      countMemberTask: newMemberSetting,
      countProjectTask: newProjectSetting
    }).then(res => {
      messageSuccess("Updated report setting !")
    })

  }

  return <div className="setting-container border dark:border-gray-700">
    <form className=" p-4 space-y-6">
      <div className="flex items-start gap-3">
        <Switch
          className="shrink-0"
          checked={projectSetting}
          onChange={val => onChange('project', val)}
        />
        <div className="text-gray-400">
          <h2 className=" text-gray-600 dark:text-gray-300 text-sm font-bold">Count incomplete tasks</h2>
          <p className="text-xs mt-1">Everyday the scheduler will count incomplete tasks of project</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Switch
          className="shrink-0"
          checked={memberSetting}
          onChange={val => onChange('member', val)}
        />
        <div className="text-gray-400">
          <h2 className=" text-gray-600 dark:text-gray-300 text-sm font-bold">Count complete tasks</h2>
          <div className="text-xs mt-1 pr-24">Everyday the scheduler will count complete tasks each member in this project</div>
        </div>
      </div>
    </form>
  </div>
}
