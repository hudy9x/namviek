export type PinnedProjectSetting = {
  id: string
  createdAt: Date
}

export interface UserSetting {
  pinnedProjects?: PinnedProjectSetting[]
}
