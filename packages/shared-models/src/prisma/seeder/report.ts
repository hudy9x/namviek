import { Stats, StatsType } from "@prisma/client"
import { pmClient } from "../../lib/_prisma"


export const generateDailyData = async () => {

  const projects = await pmClient.project.findMany({
    where: {
      organizationId: '65d6ee7893180a33c22085de',
      isArchived: false
    }
  })

  if (!projects.length) return

  const promises = []

  projects.map(p => {
    const startDateNum = 3
    const endDateNum = 15
    // const n = Math.round(Math.random() * 4) + 1
    // let total = n * 10;
    let total = 40
    const projectId = p.id

    const data: Omit<Stats, 'id'>[] = []
    for (let i = startDateNum; i <= endDateNum; i++) {
      const rand = Math.round((Math.random() * 6)) + 1
      total = total - rand

      data.push({
        type: StatsType.PROJECT_TASK_BY_DAY,
        projectId,
        year: 2024,
        month: 6,
        date: i,
        uid: null,
        orgId: null,
        data: {
          unDoneTotal: total > 0 ? total : 0
        },
        updatedAt: new Date()
      })

      if (total < 0) {
        break
      }
    }

    console.log('=================================')
    console.log(data)

    promises.push(pmClient.stats.createMany({
      data
    }))

  })

  await Promise.allSettled(promises)

  console.log('done')


  // await pmClient.stats.createMany({
  //   data: []
  // })
}
