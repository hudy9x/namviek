import { ProjectView } from '@prisma/client'
import { projectViewModel } from './_prisma'

export const mdProjectView = {
  getByProject: (projectId: string, uid: string) => {
    return projectViewModel.findMany({
      where: {
        // projectId,
        // AND: [
        //   { onlyMe: { isSet: false } },
        //   { onlyMe: false }
        // ]
        OR: [
          // condition 1
          // get all project's view
          {
            projectId, OR: [
              {
                onlyMe: {
                  isSet: false
                }
              },
              {
                onlyMe: false
              }
            ]
          },

          // condition 2
          // get views that created by user
          {
            projectId,
            onlyMe: true,
            createdBy: uid
          }

        ]
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
