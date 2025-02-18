import { Project } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { ProjectTemplate } from "@/types/template"

type IProjectProps = Pick<Project, 'name' | 'desc' | 'organizationId' | 'icon'>

export const projectGet = ({
  orgId,
  isArchive = false
}: {
  isArchive?: boolean
  orgId: string
}) => {
  return httpGet('/api/project', {
    params: {
      orgId,
      isArchived: isArchive
    }
  })
}

interface ProjectQuickAddParams {
  icon: string
  name: string
  desc: string
  views: string[]
  members: string[]
  organizationId: string
  templateId?: string
}

export const projectQuickAdd = (data: ProjectQuickAddParams) => {
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

export const projectService = {
  archive: (projectId: string, value: boolean) => {
    return httpPost('/api/project/archive', {
      projectId,
      archive: value
    })
  }
}
