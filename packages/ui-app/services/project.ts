import { Project } from '@prisma/client'
import { httpGet, httpPost, httpPut } from './_req'

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
