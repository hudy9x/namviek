import { mdTaskGetAll } from "@shared/models";
import { BaseController, UseMiddleware, Controller, Get, Post, Req } from "../../core";
import { AuthRequest } from "../../types";
import { getTodoCounter, updateTodoCounter } from "../../services/todo.counter";
import { authMiddleware, beProjectMemberMiddleware } from "../../middlewares";

@Controller('/project/task')
@UseMiddleware([authMiddleware, beProjectMemberMiddleware])
export default class TaskController extends BaseController {
  @Get('/')
  async getSingleTask() {
    const req = this.req as AuthRequest
    const projectId = req.query.projectId as string
    const tasks = await mdTaskGetAll({ projectId, dueDate: [null, null] })
    console.log('get all task from project')
    return tasks
  }

  @Get('/counter')
  async implementTaskCounter(@Req() req: AuthRequest) {
    const { id: uid } = req.authen
    const { projectIds } = req.query as { projectIds: string[] }

    if (!projectIds.length) {
      return []
      // return res.json({
      //   data: []
      // })
    }

    // get todo tasks by user

    const processes = []

    for (let i = 0; i < projectIds.length; i++) {
      const pid = projectIds[i]
      const todoCounter = await getTodoCounter([uid, pid])

      if (todoCounter) {
        processes.push(
          Promise.resolve({
            total: parseInt(todoCounter, 10),
            projectId: pid
          })
        )
        continue
      }

      processes.push(
        mdTaskGetAll({
          assigneeIds: [uid],
          projectId: pid,
          done: 'no',
          counter: true
        }).then(val => {
          return {
            total: val,
            projectId: pid
          }
        })
      )
    }

    // run all task query asynchronous
    const results = (await Promise.allSettled(
      processes
    )) as PromiseSettledResult<{ total: number; projectId: string }>[]

    // filter fulfilled results
    const lastResults = results.map(r => {
      if (r.status === 'fulfilled') {
        const { total, projectId } = r.value
        // update todo counter
        updateTodoCounter([uid, projectId], total)
        return {
          total,
          projectId
        }
      }
    })

    return lastResults
    // res.json({
    //   data: lastResults
    // })
  }

  @Get('/query')
  async implmentTaskQuery() {
    const req = this.req as AuthRequest
    return 1
  }
}
