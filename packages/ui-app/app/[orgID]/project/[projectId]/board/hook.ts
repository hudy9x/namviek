import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { TaskStatus } from ".prisma/client"
import { projectStatusGet } from "packages/ui-app/services/status"

export const useBoard = () => {
  const [ statusList, setStatusList ] = useState<TaskStatus[]>([])
  const params = useParams()

  useEffect(() => {
    void( async () => {
      try {
        const res = await projectStatusGet(params.projectId)
        const { status, data } = res.data
        if (status !== 200) return

        setStatusList(data as TaskStatus[])
      } catch (error) {
        console.log(`Get all status, ${error}`)
      }
    })()
  },[])

  return {
    statusList
  }
}
