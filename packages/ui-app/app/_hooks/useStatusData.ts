import { useProjectStatusStore } from "@/store/status"
import { useMemo } from "react"

export const useStatusData = (statusId: string) => {
  const { statuses } = useProjectStatusStore()

  const status = useMemo(() => {
    if (statuses.length) {
      const stt = statuses.find(stt => stt.id === statusId)
      if (stt) {
        return stt
      }
    }

    return null
  }, [JSON.stringify(statuses), statusId])


  return {
    status,
    color: status ? status.color : '',
    type: status ? status.type : ''
  }
}
