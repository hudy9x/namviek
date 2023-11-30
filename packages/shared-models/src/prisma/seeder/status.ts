import { PrismaClient, TaskStatus } from '@prisma/client'

const prisma = new PrismaClient()

const mdProject = prisma.project
const mdStatus = prisma.taskStatus

export const dummyTaskStatusToAllProject = () => {
  const statuses = [
    { name: 'TODO', color: '#b5bcc2', order: 1 },
    { name: 'INPROGESS', color: '#04a9f4', order: 2 },
    { name: 'REVIEW', color: '#f9d900', order: 3 },
    { name: 'RESOLVED', color: '#1bbc9c', order: 4 },
    { name: 'CLOSED', color: '#2ecd6f', order: 5 }
  ]

  mdProject.findMany().then(projects => {
    projects.forEach(p => {
      console.log('=======')
      console.log(p.name)

      mdStatus
        .findFirst({
          where: {
            projectId: p.id
          }
        })
        .then(result => {
          console.log('status', result)
          if (result) {
            console.log('project status are set !')
            return
          }

          const statusData = statuses.map(stt => {
            return {
              name: stt.name,
              color: stt.color,
              order: stt.order,
              projectId: p.id
            } as Omit<TaskStatus, 'id'>
          })

          console.log('start adding status to project')
          mdStatus
            .createMany({
              data: statusData
            })
            .then(result => {
              console.log(`added status to ${p.name}`)
            })
        })
    })
  })
}
