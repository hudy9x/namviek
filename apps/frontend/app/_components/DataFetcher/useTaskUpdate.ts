import { useDataFetcher } from "./useDataFetcher"
import { messageSuccess } from "@ui-components"
import { projectGridSv } from "@/services/project.grid"
import { FieldType } from "@prisma/client"
import { useUser } from "@auth-client"

export const useTaskUpdate = () => {
  const { setData } = useDataFetcher()
  const { user } = useUser()

  const updateOneField = ({ rowId, value, fieldId, type }: {
    rowId: string,
    value: string | string[],
    fieldId: string,
    type: FieldType
  }) => {

    setData(prevData => prevData.map(dt => {
      if (dt.id === rowId) {
        return {
          ...dt,
          updatedAt: new Date(),
          updatedBy: user?.id || ''
        }
      }
      return dt
    }))

    projectGridSv.update({
      rowId,
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
