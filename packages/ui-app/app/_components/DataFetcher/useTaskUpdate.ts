import { useDataFetcher } from "./useDataFetcher"
import { messageSuccess } from "@shared/ui"
import { taskCustomFieldSv } from "@/services/task.customfield"
import { FieldType } from "@prisma/client"
import { useUser } from "@goalie/nextjs"

export const useTaskUpdate = () => {
  const { setData } = useDataFetcher()
  const { user } = useUser()

  const updateOneField = ({ taskId, value, fieldId, type }: {
    taskId: string,
    value: string | string[],
    fieldId: string,
    type: FieldType
  }) => {

    setData(prevData => prevData.map(dt => {
      if (dt.id === taskId) {
        return {
          ...dt,
          updatedAt: new Date(),
          updatedBy: user?.id || ''
        }
      }
      return dt
    }))

    taskCustomFieldSv.update({
      taskId,
      type,
      value,
      fieldId
    }).then(res => {
      const { data, status } = res.data
      console.log('returned data:', data, status)
      if (status !== 200) return
      messageSuccess('Update field value sucecss')
    })
  }

  return {
    updateOneField
  }
}
