import { GridCollection } from "@prisma/client"
import { httpGet, httpGet2, httpPost } from "./_req"

export const gridCollectionSv = {
  create(data: { title: string, projectId: string }) {
    console.log('gridCollectionSv.create', data)
    return httpPost<GridCollection>('/api/grid-collections', data)
  },

  getByProjectId(projectId: string, abortSignal?: AbortSignal) {
    return httpGet2<GridCollection[]>(`/api/grid-collections`, {
      params: { projectId },
      signal: abortSignal
    })
  },

  getById(id: string) {
    return httpGet2<GridCollection>(`/api/grid-collections/${id}`)
  }
} 
