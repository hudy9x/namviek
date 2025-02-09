import { useDataFetcher } from "./useDataFetcher"
import { randomId } from "@ui-components"
import { useParams } from "next/navigation"
import { projectGridSv } from "@/services/project.grid"
import { Grid } from "@prisma/client"

export const useTaskAdd = () => {
  const { setData } = useDataFetcher()
  const { projectId } = useParams()

  const addNewRow = (data?: Partial<Grid>) => {
    const id = `TASK_RAND_${randomId()}`
    const insertedData = {
      id,
      title: '',
      projectId,
      customFields: {}
    } as Grid

    setData(prevData => {
      return [
        ...prevData,
        insertedData
      ]
    })

    projectGridSv.create(insertedData).then(res => {
      console.log(res)
      const { data, status } = res.data
      if (status !== 200) return

      setData(prevData => prevData.map(dt => {
        if (dt.id === id) return data
        return dt
      }))

    })
  }

  return {
    addNewRow
  }
}
