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
}

export const useMemberStore = create<MemberState>(set => ({
  members: [],
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
