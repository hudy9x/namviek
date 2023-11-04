export type PinnedProjectSetting = {
  id: string
  createdAt: Date
}

export interface UserSetting {
  pinnedProjects?: PinnedProjectSetting[]
}

interface BaseActivity {
  title?: string
  content?: string
}

interface Interaction {
  emoji: string
  uid: string
}

export interface CommentActivity extends BaseActivity {
  edited?: boolean
  interactions: Interaction[]
}

export interface AttachementActiviity extends BaseActivity {
  links?: string[] // others can reply comment's link
}

export type TaskLogActivity = string
