import { FileStorage } from '@prisma/client'

export type PinnedProjectSetting = {
  id: string
  createdAt: Date
}

export interface UserSetting {
  pinnedProjects?: PinnedProjectSetting[]
}

interface ActivityDataBase {
  title?: string
  content?: string
}

interface Interaction {
  emoji: string
  uid: string
}

export interface ActivityCommentData extends ActivityDataBase {
  edited?: boolean
  interactions: Interaction[]
}

export interface ActivityAttachData extends ActivityDataBase {
  attachedFiles?: FileStorage[] // others can reply comment's link
}

export type TaskLogActivity = string
