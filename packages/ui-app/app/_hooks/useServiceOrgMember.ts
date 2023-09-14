import { orgMemberAdd } from '@/services/organizationMember'
import { useOrgMemberStore } from '@/store/orgMember'

export const useServiceOrgMember = () => {
  const { addToOrg } = useOrgMemberStore()

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

  return {
    addNewMemberToOrg
  }
}
