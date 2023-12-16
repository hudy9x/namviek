import { FileStorage } from '@prisma/client'

export type PinnedProjectSetting = {
  id: string
  createdAt: Date
}

export interface UserSetting {
  pinnedProjects?: PinnedProjectSetting[]
}

interface ActivityData {
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

interface ActivityChangeData extends ActivityData {
  changeFrom: string
  changeTo: string
}

export type ActivityLogData = ActivityChangeData
