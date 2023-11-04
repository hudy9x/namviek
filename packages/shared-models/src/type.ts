export type PinnedProjectSetting = {
  id: string
  createdAt: Date
}

export interface UserSetting {
  pinnedProjects?: PinnedProjectSetting[]
}

interface ActivityBase {
  title?: string
  content?: string
}

interface Interaction {
  emoji: string
  uid: string
}

export interface CommentActivity extends ActivityBase {
  edited?: boolean
  interactions: Interaction[]
}

export interface AttachementActiviity extends ActivityBase {
  links?: string[] // others can reply comment's link
}

export type TaskLogActivity = string
