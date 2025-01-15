import { Vision } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { IVisionFilter } from '@/features/Project/Vision/context'

export const visionGetByProject = (
  projectId: string,
  filter: IVisionFilter,
  signal?: AbortSignal
) => {
  return httpGet('/api/vision/get-by-project', {
    signal: signal,
    params: {
      projectId,

      month: filter.month
    }
  })
}

export const visionGetByOrg = (orgId: string) => {
  return httpGet('/api/vision/get-by-org', {
    params: {
      orgId
    }
  })
}

export const visionAdd = (data: Partial<Vision>) => {
  return httpPost('/api/vision', data)
}

export const visionUpdate = (data: Partial<Vision>) => {
  return httpPut('/api/vision', data)
}

export const visionDelete = (id: string) => {
  return httpDel(`/api/vision/${id}`)
}
