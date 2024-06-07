import { StatusType } from "@prisma/client"
import { pmClient } from "packages/shared-models/src/lib/_prisma"

export default class MemberStatsAction {
  constructor() {
    this.run()
  }

  private async run() {
    // pmClient.$runCommandRaw(
    //
    // )
    //
    const doneStatus = await pmClient.taskStatus.findMany({
      where: {
        type: StatusType.DONE
      },
      select: {
        id: true,
        type: true,
        name: true
      }
    })

    const ids = doneStatus.map(d => {
      // const obid = new ObjectId(d.id)
      // return obid.toString()
      return { "$oid": d.id }
    })

    const result = await pmClient.task.aggregateRaw({
      pipeline: [
        {
          $match: {
            taskStatusId: {
              $nin: ids
            }
          }
        },
        { $unwind: "$assigneeIds" },
        {
          $project: {
            assigneeIdStr: { $toString: "$assigneeIds" },
            projectIdStr: { $toString: "$projectId" }
          }
        },

        // // group by assignee for all project
        // {
        //   $group: {
        //     _id: "$assigneeIds",
        //     totalTask: { $count: {} }
        //   }
        // }

        // group by assignee + projectid
        {
          $group: {
            _id: { $concat: ["$assigneeIdStr", "_", "$projectIdStr"] },
            totalTask: { $count: {} }
          }
        }

      ]
    })

    console.log(result)


  }
}
