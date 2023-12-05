import { FileStorage } from '@prisma/client'

export type PinnedProjectSetting = {
  id: string
  createdAt: Date
}

export interface UserSetting {
  pinnedProjects?: PinnedProjectSetting[]
}

interface ActivityData {
  // title?: string
  content?: string
}

interface Interaction {
  emoji: string
  updatedBy: string
}

export interface ActivityCommentData extends ActivityData {
  edited?: boolean
  interactions?: Interaction[]
}

export interface ActivityAttachData extends ActivityData {
  attachedFile?: FileStorage // others can reply comment's link
}

export type TaskLogActivity = string
