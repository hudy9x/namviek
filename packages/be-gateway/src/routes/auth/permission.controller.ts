import { mdMemberBelongToProject } from "@shared/models";
import { BaseController, Body, Controller, Get, Param, Query } from "../../core";

@Controller('/user-permission')
export default class UserPermission extends BaseController {
  @Get('/project')
  async getProjectPermission(@Query() query) {
    console.log(query)
    const uid = '649ab9864792890df8449c68'
    const { projectId } = query as { projectId: string }

    const result = await mdMemberBelongToProject(uid, projectId)

    return result
  }

}
