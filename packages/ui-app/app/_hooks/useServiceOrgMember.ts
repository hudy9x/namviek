import { orgMemberAdd, orgMemberRemove } from '@/services/organizationMember'
import { useOrgMemberStore } from '@/store/orgMember'
import { useOrganizationBySlug } from './useOrganizationBySlug'

export const useServiceOrgMember = () => {
  const { org } = useOrganizationBySlug()
  const { addToOrg, removeFromOrg } = useOrgMemberStore()

  const addNewMemberToOrg = (data: { orgId: string; email: string }) => {
    return new Promise((resolve, reject) => {
      orgMemberAdd(data)
        .then(res => {
          const { data } = res.data
          addToOrg(data)
          resolve(1)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const removeMemberFromOrg = (uid: string) => {
    if (!org) {
      return Promise.reject(new Error('Organization is not defined'));
    }
    
    return orgMemberRemove({
      uid,
      orgId: org?.id
    })
  }

  return {
    addNewMemberToOrg,
    removeMemberFromOrg
  }
}
