import { orgMemberAdd, orgMemberRemove } from '@/services/organizationMember'
import { useOrgMemberStore } from '@/store/orgMember'
import { useOrgIdBySlug } from './useOrgIdBySlug'

export const useServiceOrgMember = () => {
  const { orgId } = useOrgIdBySlug()
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
    if (!orgId) {
      return Promise.reject(new Error('Organization ID is not defined'));
    }
    
    return orgMemberRemove({
      uid,
      orgId,
    })
  }

  return {
    addNewMemberToOrg,
    removeMemberFromOrg
  }
}
