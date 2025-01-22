import { create } from 'zustand'
import { MemberRole, User } from '@prisma/client'
import { produce } from 'immer'

type UserMember = User & {
  role: MemberRole
}

interface ExampleState {
  members: UserMember[]
  addAllMember: (data: UserMember[]) => void
}

export const useExampleStore = create<ExampleState>(set => ({
  members: [],
  addAllMember: (data: UserMember[]) =>
    set(
      produce((state: ExampleState) => {
        state.members = data
      })
    )
}))
