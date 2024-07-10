import { InvitationStatus, Organization, OrganizationRole } from "@prisma/client"
import { pmClient } from "../../lib/_prisma"
import { generateSlug } from "../../lib"

const MAX_STORAGE_SIZE = 100 * 1024 * 1024 // 100Mb

export const createOrganization = async (body: {
  name: string,
  desc?: string,
  cover?: string,
  uid: string
}) => {
  try {
    const result = await pmClient.organization.create({
      data: {
        name: body.name,
        desc: body.desc,
        slug: generateSlug(body.name),
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

export const updateAllSlug = async () => {
  const orgs = await pmClient.organization.findMany({
    select: {
      id: true,
      name: true
    }
  })

  const promises = []
  for (const org of orgs) {
    const { id, name } = org
    const slug = generateSlug(name.toLowerCase())

    console.log('slug', slug)

    promises.push(updateOrganization(id, { name, slug }))
  }

  await Promise.allSettled(promises)
}

export const updateOrganization = async (id: string, data: Partial<Organization>) => {
  try {
    await pmClient.organization.update({
      data: data,
      where: {
        id,
      },
    })

    console.log('update organization succesfully')
  } catch (error) {
    console.log('update organization error', error)
    return null
  }
}
