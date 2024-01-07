import { create } from 'zustand'
import { MemberRole, User } from '@prisma/client'
import { produce } from 'immer'

type UserPermission = User & {
  role: MemberRole
}

interface PermissionState {
  members: UserPermission[]
  addAllMember: (data: UserPermission[]) => void
}

export const usePermissionStore = create<PermissionState>(set => ({
  members: [],
  addAllMember: (data: UserPermission[]) =>
    set(
      produce((state: PermissionState) => {
        state.members = data
      })
    )
}))
