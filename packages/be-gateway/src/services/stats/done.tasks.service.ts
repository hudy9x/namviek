import { StatsType, StatusType } from "@prisma/client";
import { lastDayOfMonth } from "date-fns";
import { pmClient } from "packages/shared-models/src/lib/_prisma";
import { sendDiscordLog } from "../../lib/log";

export default class StatsDoneTaskService {
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

      sendDiscordLog("Count done tasks per member finished")
    } catch (error) {
      sendDiscordLog("done.task.service.error: " + JSON.stringify(error))
      console.log('done.task.service error', error)
    }
  }
}
