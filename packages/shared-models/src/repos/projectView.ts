// import { ProjectView } from '@prisma/client'
// import { projectViewModel } from './_prisma'
import { projectViewModel, IProjectViewField } from "../schema";

export const mdProjectView = {
  getByProject: (projectId: string, uid: string) => {
    return projectViewModel.find({
      $or: [
        // condition 1: get all project's view
        {
          projectId,
          $or: [
            { onlyMe: { $exists: false } },
            { onlyMe: false }
          ]
        },

        // condition 2: get views that created by user
        {
          projectId,
          onlyMe: true,
          createdBy: uid
        }
      ]
    })
  },
  getByProjects: (projectIds: string[]) => {
    return projectViewModel.find({
      projectId: { $in: projectIds }
    })
  },

  add: (data: Omit<IProjectViewField, 'id'>) => {
    return projectViewModel.create({
      data
    })
  },

  update: (id: string, data: Partial<IProjectViewField>) => {
    return projectViewModel.findByIdAndUpdate(id, data)
  },

  delete: (id: string) => {
    return projectViewModel.findByIdAndDelete(id)
  }
}
