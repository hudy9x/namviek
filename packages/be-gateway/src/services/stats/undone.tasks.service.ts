import { StatsType, StatusType } from "@prisma/client";
import { lastDayOfMonth } from "date-fns";
import { pmClient } from "packages/shared-models/src/lib/_prisma";

export default class StatsUnDoneTaskService {
  async implement(projectId: string) {
    try {
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

    } catch (error) {
      console.log('undone.tasks.service error', error)
    }
  }
}
