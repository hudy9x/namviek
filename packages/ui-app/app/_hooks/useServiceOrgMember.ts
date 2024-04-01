import { orgMemberAdd, orgMemberRemove } from '@/services/organizationMember'
import { useOrgMemberStore } from '@/store/orgMember'
import { useUrl } from './useUrl'

export const useServiceOrgMember = () => {
  const { orgID } = useUrl()
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
    removeFromOrg(uid)
    return orgMemberRemove({
      uid,
      orgId: orgID
    })
  }

  return {
    addNewMemberToOrg,
    removeMemberFromOrg
  }
}
