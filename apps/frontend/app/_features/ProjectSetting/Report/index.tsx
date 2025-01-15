import { useEffect, useState } from "react";
import ReportSettingContainer from "./ReportSettingContainer";
import { projectSettingReport } from "@/services/projectSettingReport";
import { useParams } from "next/navigation";
import { Loading } from "@shared/ui";

export default function ProjectReportSetting() {
  const { projectId } = useParams()
  const [loading, setLoading] = useState(true)
  const [reportSetting, setReportSetting] = useState({
    countProjectTask: false,
    countMemberTask: false,
  })

  useEffect(() => {
    if (!projectId) return
    const controller = new AbortController()
    setLoading(true)

    projectSettingReport.get(projectId, controller.signal).then(res => {
      const { data } = res.data
      const reportData = data as {
        id: string,
        countMemberTask: boolean
        countProjectTask: boolean
      }

      console.log('reportData', reportData)
      setReportSetting({
        countProjectTask: !!reportData.countProjectTask,
        countMemberTask: !!reportData.countMemberTask
      })
      setLoading(false)
    })

    return () => {
      controller.abort()
    }
  }, [projectId])


  if (loading) {
    return (
      <div className="setting-container p-4 border dark:border-gray-700">
        <Loading title="Getting your settings ..." />
      </div>
    )
  }

  return <ReportSettingContainer id={projectId} {...reportSetting} />
}
