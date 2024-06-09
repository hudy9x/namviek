import { StatusType } from "@prisma/client"
import { pmClient } from "../../lib/_prisma"
import { lastDayOfMonth } from "date-fns";

async function runDoneTasksByMembers(pid) {
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
  const DAY_STATS_COLLECTION_NAME = "DayStats";
  const projectId = { "$oid": pid };

  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const d = now.getDate()

  const firstDay = new Date(y, m, 1, 0, 0)
  const lastDay = lastDayOfMonth(now)
  lastDay.setHours(23)
  lastDay.setMinutes(59)

  console.log('firstDay', firstDay)
  console.log('lastDay', lastDay)

  const filterTasks = {
    $match: {
      taskStatusId: {
        // $nin: ids,
        $in: ids
      },
      projectId,
      // $or: [
      //   // dueDate is in the month
      //   {
      //     $and: [
      //       {
      //         dueDate: {
      //           $gte: firstDay,
      //         },
      //       },
      //       {
      //         dueDate: {
      //           $lte: lastDay,
      //         },
      //       },
      //     ],
      //   },
      // ]
    }
  }

  const unwindAssigneeIds = { $unwind: "$assigneeIds" };
  const selectNConvertFields = {
    $project: {
      assigneeIdStr: { $toString: "$assigneeIds" },
      projectIdStr: { $toString: "$projectId" },
    }
  }

  const result = await pmClient.task.aggregateRaw({
    pipeline: [
      filterTasks,
      unwindAssigneeIds,
      selectNConvertFields,
      {
        $addFields: {
          year: y,
          month: m + 1,
          date: d,
          time: `${now.getHours()}:${now.getMinutes()}`,
          dateStr: `${y}-${m + 1}-${d}`
        }
      },

      // group by assignee + projectid
      {
        $group: {
          _id: { $concat: ["$assigneeIdStr", "_", "$projectIdStr", "_", "$dateStr"] },
          tasks: {
            $push: '$_id'
          },
          doneTasks: { $count: {} },
          uid: { $first: "$assigneeIdStr" },
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
          type: 'MEMBER_STATS',
          datas: {
            tasks: "$tasks",
            doneTasks: '$doneTasks',
            uid: '$uid',
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

  console.log('done', result)
}

export const runTest = async () => {

  await runDoneTasksByMembers('65e93b8c34df285397fd0b60')

}
