import { create } from 'zustand'
import { MemberRole, User } from '@prisma/client'
import { produce } from 'immer'

export type UserMember = User & {
  role: MemberRole
}

interface MemberState {
  members: UserMember[]
  addAllMember: (data: UserMember[]) => void
  addMember: (data: UserMember[]) => void
  delMember: (uid: string) => void
  updateMemberRole: (uid: string, role: MemberRole) => void
}

export const useMemberStore = create<MemberState>(set => ({
  members: [],
  updateMemberRole: (uid: string, role: MemberRole) =>
    set(
      produce((state: MemberState) => {
        state.members.some((m, index) => {
          const bool = m.id === uid

          if (bool) {
            state.members[index].role = role
          }

          return bool
        })
      })
    ),
  delMember: (uid: string) =>
    set(
      produce((state: MemberState) => {
        state.members = state.members.filter(m => m.id !== uid)
      })
    ),
  addMember: (data: UserMember[]) =>
    set(
      produce((state: MemberState) => {
        state.members = [...state.members, ...data]
      })
    ),
  addAllMember: (data: UserMember[]) =>
    set(
      produce((state: MemberState) => {
        state.members = data
      })
    )
}))
