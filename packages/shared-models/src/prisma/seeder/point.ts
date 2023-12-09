import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const mdProject = prisma.project
const mdPoint = prisma.taskPoint

export const dummyTaskPointToAllProject = async () => {
  const points = [1, 2, 3, 5, 8]
  console.log('create dummy points to all projects', points)

  mdProject.findMany().then(projects => {
    projects.forEach(p => {
      console.log('=======')
      console.log(p.name)

      mdPoint
        .findFirst({
          where: {
            projectId: p.id
          }
        })
        .then(result => {
          console.log('point', result)
          if (result) {
            console.log('project points are set !')
            return
          }

          const pointData = points.map(point => {
            return {
              point,
              projectId: p.id,
              icon: null
            }
          })

          console.log('start adding points to project')
          mdPoint
            .createMany({
              data: pointData
            })
            .then(() => {
              console.log('done')
            })
        })
    })
  })
}
