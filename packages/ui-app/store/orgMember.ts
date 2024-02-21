import { create } from 'zustand'
import { InvitationStatus, MemberRole, OrganizationRole, User } from '@prisma/client'
import { produce } from 'immer'

export type OrgMember = User & {
  role: OrganizationRole
}

interface OrgMemberState {
  orgMembers: OrgMember[]
  addAllOrgMember: (data: OrgMember[]) => void
  addToOrg: (data: OrgMember) => void
}

export const useOrgMemberStore = create<OrgMemberState>(set => ({
  orgMembers: [],
  addAllOrgMember: (data: OrgMember[]) =>
    set(
      produce((state: OrgMemberState) => {
        state.orgMembers = data
      })
    ),
  addToOrg: (data: OrgMember) =>
    set(
      produce((state: OrgMemberState) => {
        state.orgMembers.push(data)
      })
    )
}))
