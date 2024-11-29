import {
  mdMemberGetAllByProjectId,
  mdOrgMemberAdd,
  mdOrgMemberExist,
  mdOrgMemberGet,
  mdOrgMemberGetAll,
  mdOrgMemberSeach,
  mdUserFindEmail
} from '@shared/models'
import {
  BaseController,
  Controller,
  Delete,
  Get,
  Post,
  UseMiddleware
} from '../../core'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import InternalServerException from '../../exceptions/InternalServerException'
import { InvitationStatus, OrganizationRole } from '@prisma/client'
import BadRequestException from '../../exceptions/BadRequestException'
import OrgMemberRemoveService from '../../services/orgMember/remove.service'

const MAX_ORGANIZATION_MEMBER = 25

@Controller('/org/member')
@UseMiddleware([authMiddleware])
export class OrganizationMemberController extends BaseController {
  orgMemberRemoveService: OrgMemberRemoveService
  constructor() {
    super()
    this.orgMemberRemoveService = new OrgMemberRemoveService()
  }
  @Get('/:orgId')
  async getMembersByOrgId() {
    const req = this.req
    try {
      const { orgId } = req.params as { orgId: string }
      const result = await mdOrgMemberGet(orgId)
      const users = result.map(r => {
        const user = r.users
        user.password = ''

        return { ...user, role: r.role }
      })
      return users
    } catch (error) {
      console.log(error)
      throw new InternalServerException()
    }
  }

  @Post('/invite')
  async inviteMember() {
    const req = this.req as AuthRequest
    const { id: uid } = req.authen
    const { orgId, email } = req.body as {
      orgId: string
      email: string
    }

    const foundUser = await mdUserFindEmail(email)
    if (!foundUser) {
      console.log(1)
      throw new BadRequestException('EMAIL_NOT_FOUND')
    }

    const isAlreadyExist = await mdOrgMemberExist({
      orgId,
      uid: foundUser.id
    })

    if (isAlreadyExist) throw new BadRequestException('ALREADY_EXIST')

    const members = await mdOrgMemberGetAll(orgId)

    if (members.length >= MAX_ORGANIZATION_MEMBER) {
      throw new BadRequestException('MAX_ORGANIZATION_MEMBER')
    }

    console.log('founded', foundUser)

    await mdOrgMemberAdd({
      organizationId: orgId,
      uid: foundUser.id,
      status: InvitationStatus.ACCEPTED,
      role: OrganizationRole.MEMBER,
      createdAt: new Date(),
      createdBy: uid,
      updatedAt: null,
      updatedBy: null
    })

    return foundUser
  }

  @Delete('/remove/:orgId/:uid')
  async removeMember() {
    const { uid, orgId } = this.req.params as { uid: string, orgId: string }

    try {
      console.log('run 5')
      const result = await this.orgMemberRemoveService.implement(uid, orgId)
      return result
    } catch (error) {
      console.log(error)
      throw new InternalServerException(error)
    }

  }

  @Post('/search')
  async searchMember() {
    const req = this.req
    const { projectId, orgId, term } = req.body as {
      projectId: string
      orgId: string
      term: string
    }

    console.log('search query', projectId, orgId, term)

    try {
      const existingMembers = await mdMemberGetAllByProjectId(projectId)
      const existingMemIds = existingMembers.map(m => m.uid)

      const data = await mdOrgMemberSeach({
        orgId,
        term,
        notUids: existingMemIds
      })

      return data
    } catch (error) {
      console.log(error)
      throw new InternalServerException()
    }
  }
}
