import { Vision } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'

export const visionGetByProject = (projectId: string) => {
  return httpGet('/api/vision/get-by-project', {
    params: {
      projectId
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
