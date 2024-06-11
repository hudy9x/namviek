import { StatsType, StatusType } from "@prisma/client"
import { pmClient } from "../../lib/_prisma"
import { lastDayOfMonth } from "date-fns";

async function runUnDoneTask(projectId: string) {
  const doneStatus = await pmClient.taskStatus.findMany({
    where: {
      type: StatusType.DONE,
    },
    select: {
      id: true,
    }
  })

  const ids = doneStatus.map(d => d.id)

  console.log('projectId', projectId)

  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const d = now.getDate()
  const month = m + 1

  const firstDay = new Date(y, m, 1, 0, 0)
  const lastDay = lastDayOfMonth(now)
  lastDay.setHours(23)
  lastDay.setMinutes(59)

  const result = await pmClient.task.findMany({
    where: {
      projectId,
      taskStatusId: {
        notIn: ids
      },
      OR: [
        {
          AND: [
            {
              dueDate: {
                gte: firstDay
              }
            },
            {
              dueDate: {
                lte: lastDay
              }
            },

          ]

        }
      ]
    },
    select: {
      id: true,
      dueDate: true,
    }
  })

  console.log(result.length)
  const existing = await pmClient.stats.findFirst({
    where: {
      projectId,
      year: y,
      month,
      date: d
    }
  })

  if (existing) {
    await pmClient.stats.update({
      where: {
        id: existing.id
      },
      data: {
        data: {
          unDoneTotal: result.length
        },
        updatedAt: new Date()
      }
    })
  } else {
    console.log(1)
    await pmClient.stats.create({
      data: {
        type: StatsType.PROJECT_TASK_BY_DAY,
        projectId,
        year: y,
        month,
        date: d,
        data: {
          unDoneTotal: result.length
        },
        updatedAt: new Date()
      }
    })
  }
}

async function runDoneTaskByMem(projectId: string) {
  const doneStatus = await pmClient.taskStatus.findMany({
    where: {
      type: StatusType.DONE,
    },
    select: {
      id: true,
    }
  })

  const ids = doneStatus.map(d => d.id)

  console.log('projectId', projectId)

  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const d = now.getDate()
  const month = m + 1

  const firstDay = new Date(y, m, 1, 0, 0)
  const lastDay = lastDayOfMonth(now)
  lastDay.setHours(23)
  lastDay.setMinutes(59)

  const result = await pmClient.task.findMany({
    where: {
      projectId,
      assigneeIds: {
        isEmpty: false
      },
      taskStatusId: {
        in: ids
      },
      OR: [
        {
          AND: [
            {
              dueDate: {
                gte: firstDay
              }
            },
            {
              dueDate: {
                lte: lastDay
              }
            },

          ]

        }
      ]
    },
    select: {
      id: true,
      assigneeIds: true,
      dueDate: true,
    }
  })


  const totalByMembers = new Map<string, number>()

  result.forEach(r => {
    r.assigneeIds.forEach(a => {
      if (totalByMembers.has(a)) {
        totalByMembers.set(a, totalByMembers.get(a) + 1)
      } else {
        totalByMembers.set(a, 1)
      }
    })

  })

  totalByMembers.forEach(async (total, uid) => {

    const existing = await pmClient.stats.findFirst({
      where: {
        projectId,
        type: StatsType.MEMBER_TASK_BY_DAY,
        uid,
        year: y,
        month,
        date: d
      }
    })

    // create new if doesn't exist
    if (!existing) {
      await pmClient.stats.create({
        data: {
          type: StatsType.MEMBER_TASK_BY_DAY,
          projectId,
          uid,
          year: y,
          month,
          date: d,
          data: {
            doneTotal: total
          },
          updatedAt: new Date()
        }
      })

      // update if existing
    } else {
      await pmClient.stats.update({
        where: {
          id: existing.id
        },
        data: {
          data: {
            doneTotal: total
          },
          updatedAt: new Date()
        }

      })
    }
  })


}


export const runTest = async () => {

  // await runUnDoneTask('65e93b8c34df285397fd0b60')
  await runDoneTaskByMem('65e93b8c34df285397fd0b60')

}
