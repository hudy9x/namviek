import { Project } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'

type IProjectProps = Pick<Project, 'name' | 'desc' | 'organizationId' | 'icon'>

export const projectGet = () => {
  return httpGet('/api/project')
}

export const projectQuickAdd = (data: IProjectProps) => {
  console.log('project add data', data)
  return httpPost('/api/project', data)
}

export const projectUpdate = (data: Partial<Project>) => {
  return httpPut('/api/project', data)
}

export const projectPinGetList = () => {
  return httpGet('/api/project/pin')
}

export const projectPin = (projectId: string) => {
  return httpPost('/api/project/pin', { projectId })
}

export const projectUnpin = (projectId: string) => {
  return httpDel('/api/project/pin', { params: { projectId } })
}
