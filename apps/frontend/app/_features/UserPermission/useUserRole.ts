import { useMemberStore } from '@/store/member'
import { useOrgMemberStore } from '@/store/orgMember'
import { useUser } from '@goalie/nextjs'
import { useMemo } from 'react'

export const useUserRole = () => {
  const { members } = useMemberStore()
  const { orgMembers } = useOrgMemberStore()
  const { user } = useUser()

  const role = useMemo(() => {
    if (user && user.id) {
      const you = members.find(m => m.id === user.id)
      if (you) {

        return you.role
      }
    }

    return 'GUEST'
  }, [JSON.stringify(members), user?.id])

  const orgRole = useMemo(() => {
    if (user && user.id) {
      const you = orgMembers.find(m => m.id === user.id)
      if (you) {

        return you.role
      }
    }

    return 'MEMBER'
  }, [JSON.stringify(orgMembers), user?.id])

  return {
    projectRole: role,
    orgRole: orgRole
  }
}
