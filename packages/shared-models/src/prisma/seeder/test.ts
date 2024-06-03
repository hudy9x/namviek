import { pmClient } from "../../lib/_prisma"

export const runTest = async () => {

  const results = await pmClient.task.findMany({
    where: {
      projectId: '65ead4dd34df285397fd0d32',
      OR: [
        { taskPoint: null },
        {
          taskPoint: {
            isSet: false
          }
        }

      ]

      // taskPoint: { isSet: false },
      // projectId: '65ead4dd34df285397fd0d32',

    },
    select: {
      title: true,
      taskPoint: true
    },
    // take: 10
  })

  console.log('total:', results.length)
  results.forEach(r => {
    if (r.taskPoint) {
      console.log(r)
    }
  })

}
