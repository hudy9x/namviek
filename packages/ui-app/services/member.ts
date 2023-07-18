import { MemberRole } from '@prisma/client'
import { UserMember } from '../store/member'
import { httpDel, httpGet, httpPost, httpPut } from './_req'

export const getProjectMember = (projectId: string) => {
  return httpGet('/api/project/member', {
    params: { projectId }
  })
}

export const memAddNewToProject = (
  projectId: string,
  members: UserMember[]
) => {
  return httpPost('/api/project/member', {
    projectId,
    members
  })
}

export const memUpdateRole = (
  uid: string,
  projectId: string,
  role: MemberRole
) => {
  return httpPut('/api/project/member/role', {
    uid,
    role,
    projectId
  })
}

export const memDeleteFromProject = (projectId: string, uid: string) => {
  return httpDel('/api/project/member', {
    params: {
      projectId,
      uid
    }
  })
}
