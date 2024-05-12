import { InvitationStatus, OrganizationRole } from "@prisma/client"
import { pmClient } from "../../lib/_prisma"

const MAX_STORAGE_SIZE = 100 * 1024 * 1024 // 100Mb

export const createOrganization = async (body: {
  name: string,
  desc?: string,
  cover?: string
  uid: string
}) => {
  try {
    const result = await pmClient.organization.create({
      data: {
        name: body.name,
        desc: body.desc,
        maxStorageSize: MAX_STORAGE_SIZE,
        cover: body.cover,
        avatar: null,
        createdAt: new Date(),
        createdBy: body.uid,
        updatedAt: null,
        updatedBy: null
      }
    })

    await pmClient.organizationMembers.create({
      data: {
        uid: body.uid,
        status: InvitationStatus.ACCEPTED,
        organizationId: result.id,
        role: OrganizationRole.ADMIN,
        createdAt: new Date(),
        createdBy: result.id,
        updatedAt: null,
        updatedBy: null
      }
    })

    console.log('created new organization')
    return result

  } catch (error) {
    console.log('create organization error', error)
    return null
  }

}
