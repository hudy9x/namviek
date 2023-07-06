import { create } from 'zustand';
import { MemberRole, User } from '@prisma/client';
import { produce } from 'immer';

type UserMember = User & {
  role: MemberRole;
};

interface MemberState {
  members: UserMember[];
  addAllMember: (data: UserMember[]) => void;
}

export const useMemberStore = create<MemberState>(set => ({
  members: [],
  addAllMember: (data: UserMember[]) =>
    set(
      produce((state: MemberState) => {
        state.members = data;
      })
    )
}));
