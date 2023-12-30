import { ProjectView } from '@prisma/client'
import { projectViewModel } from './_prisma'

export const mdProjectView = {
  getByProject: (projectId: string) => {
    return projectViewModel.findMany({
      where: {
        projectId
      }
    })
  },
  getByProjects: (projectIds: string[]) => {
    return projectViewModel.findMany({
      where: {
        projectId: { in: projectIds }
      },
      // distinct: ['projectId']
    })
  },

  add: (data: Omit<ProjectView, 'id'>) => {
    return projectViewModel.create({
      data
    })
  },

  update: (id: string, data: Partial<ProjectView>) => {
    return projectViewModel.update({
      where: {
        id
      },
      data
    })
  },

  delete: (id: string) => {
    return projectViewModel.delete({
      where: {
        id
      }
    })
  }
}
