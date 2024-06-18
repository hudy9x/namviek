import { Stats, StatsType } from "@prisma/client"
import { pmClient } from "../../lib/_prisma"


export const generateDailyData = async () => {

  console.log('clean stats data first')
  await pmClient.stats.deleteMany({})

  console.log('start fetching projects')
  const orgId = '664588e52f5b6db5010db971'
  const year = 2024
  const month = 6

  const projects = await pmClient.project.findMany({
    where: {
      organizationId: orgId,
      isArchived: false
    }
  })

  if (!projects.length) return

  const promises = []

  console.log('projects', projects)

  projects.map(async p => {
    const startDateNum = 1
    const endDateNum = 30
    let total = 80
    const projectId = p.id

    const data: Omit<Stats, 'id'>[] = []
    console.log('generate daily report by project list')

    for (let i = startDateNum; i <= endDateNum; i++) {
      const rand = Math.round((Math.random() * 6)) + 1

      data.push({
        type: StatsType.PROJECT_TASK_BY_DAY,
        projectId,
        year,
        month,
        date: i,
        uid: null,
        orgId,
        data: {
          unDoneTotal: total > 0 ? total : 0
        },
        updatedAt: new Date()
      })
      total = total - rand

      if (total < 0) {
        break
      }
    }

    console.log('insert daily project report into database')
    promises.push(pmClient.stats.createMany({
      data
    }))

    console.log('done')

    console.log('////////////////////////////\n')
    console.log('fetching members')
    const members = await pmClient.members.findMany({
      where: {
        projectId: projectId
      }
    })

    console.log('generate daily report by each member')
    const memTotalStore = new Map<string, number>()

    for (let i = startDateNum; i <= endDateNum; i++) {
      const memberReportPromises = []
      for (let j = 0; j < members.length; j++) {
        const mem = members[j];
        const doneTask = Math.round((Math.random() * 6)) + 1

        const oldTotal = memTotalStore.get(mem.id) || 0
        const t = oldTotal + doneTask
        memTotalStore.set(mem.id, t)

        memberReportPromises.push(pmClient.stats.create({
          data: {
            type: StatsType.MEMBER_TASK_BY_DAY,
            projectId,
            year,
            month,
            date: i,
            uid: mem.uid,
            orgId,
            data: {
              doneTotal: t
            },
            updatedAt: new Date()
          }
        }))
      }
      await Promise.all(memberReportPromises)
      console.log(`day ${i} done!`)
    }




  })

  await Promise.allSettled(promises)

  console.log('done')


  // await pmClient.stats.createMany({
  //   data: []
  // })
}
