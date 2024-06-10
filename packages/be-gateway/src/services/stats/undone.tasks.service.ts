import { StatusType } from "@prisma/client";
import { lastDayOfMonth } from "date-fns";
import { pmClient } from "packages/shared-models/src/lib/_prisma";

export default class StatsUnDoneTaskService {
  async implement(pid: string) {
    try {

      const doneStatus = await pmClient.taskStatus.findMany({
        where: {
          type: StatusType.DONE,
        },
        select: {
          id: true,
          type: true,
          name: true
        }
      })

      const ids = doneStatus.map(d => ({ "$oid": d.id }))
      const DAY_STATS_COLLECTION_NAME = "DayStatsByProject";
      const projectId = { "$oid": pid };

      console.log('projectId', projectId)

      const now = new Date()
      const y = now.getFullYear()
      const m = now.getMonth()
      const d = now.getDate()

      const firstDay = new Date(y, m, 1, 0, 0)
      const lastDay = lastDayOfMonth(now)
      lastDay.setHours(23)
      lastDay.setMinutes(59)

      const filterTasks = {
        $match: {
          taskStatusId: {
            $nin: ids,
          },
          projectId,
          $or: [
            // dueDate is in the month
            {
              $and: [
                {
                  dueDate: {
                    $gte: firstDay,
                  },
                },
                {
                  dueDate: {
                    $lte: lastDay,
                  },
                },
              ],
            },
          ]
        }
      }

      const unwindAssigneeIds = { $unwind: "$assigneeIds" };
      const selectNConvertFields = {
        $project: {
          assigneeIdStr: { $toString: "$assigneeIds" },
          projectIdStr: { $toString: "$projectId" },
        }
      }

      const addFields = {
        $addFields: {
          year: y,
          month: m + 1,
          date: d,
          time: `${now.getHours()}:${now.getMinutes()}`,
          dateStr: `${y}-${m + 1}-${d}`
        }
      }

      const result = await pmClient.task.aggregateRaw({
        pipeline: [
          filterTasks,
          unwindAssigneeIds,
          selectNConvertFields,
          addFields,
          // group by  projectid
          {
            $group: {
              _id: { $concat: ["P", "_", "$projectIdStr", "_", "$dateStr"] },
              unDoneTasks: { $count: {} },
              projectId: { $first: "$projectIdStr" },

              year: { $first: "$year" },
              month: { $first: "$month" },
              date: { $first: "$date" },
              time: { $first: "$time" },

            }
          },

          {
            $project: {
              // _id: 0, // remove _id from the prev stage that makes mongodb generate a new one
              _id: 1,
              type: 'PROJECT_STATS',
              datas: {
                unDoneTasks: '$unDoneTasks',
                projectId: '$projectId',
              },
              year: "$year",
              month: "$month",
              date: "$date",
              time: "$time",

            }
          },

          // merge into a collection
          {
            $merge: {
              into: DAY_STATS_COLLECTION_NAME,
              whenMatched: "replace"
            }
          }

        ]
      })

      console.log('done', result, DAY_STATS_COLLECTION_NAME)
    } catch (error) {

      console.log(error)

    }

  }
}
