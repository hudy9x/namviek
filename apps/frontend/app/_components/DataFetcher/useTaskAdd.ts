import { useDataFetcher } from "./useDataFetcher"
import { randomId } from "@ui-components"
import { useParams } from "next/navigation"
import { ExtendedTask } from "@/store/task"
import { projectGridSv } from "@/services/project.grid"

export const useTaskAdd = () => {
  const { setData } = useDataFetcher()
  const { projectId } = useParams()

  const addNewRow = (data?: Partial<ExtendedTask>) => {
    const id = `TASK_RAND_${randomId()}`
    const insertedData = {
      id,
      title: '',
      projectId,
      customFields: {}
    } as ExtendedTask

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
