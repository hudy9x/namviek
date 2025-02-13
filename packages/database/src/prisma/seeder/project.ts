import { MemberRole, ProjectViewType } from "@prisma/client"
import { pmClient } from "../../lib/_prisma"

export const createProject = async (body: {
  icon?: string
  name: string
  desc?: string
  organizationId: string
  uid: string
}) => {

  const userId = body.uid
  const members = [userId]

  await pmClient.$transaction(async tx => {

    // console.log('create project')
    const result = await tx.project.create({
      data: {
        cover: null,
        icon: body.icon || '',
        projectViewId: null,
        name: body.name,
        desc: body.desc,
        createdBy: body.uid,
        isArchived: false,
        createdAt: new Date(),
        organizationId: body.organizationId,
        updatedAt: null,
        updatedBy: null
      }
    })

    // console.log('project created', result.id)

    // Add default project views - START

    const [theFirstView, ...restView] = [ProjectViewType.LIST, ProjectViewType.BOARD]

    let viewOrder = 1
    const defaultView = {
      icon: null,
      name: theFirstView.slice(0, 1).toUpperCase() + theFirstView.slice(1).toLowerCase(),
      projectId: result.id,
      type: theFirstView as ProjectViewType,
      data: {},
      order: viewOrder,
      createdAt: new Date(),
      createdBy: userId,
      updatedBy: null,
      updatedAt: null
    }

    const restViewDatas = restView.map(v => ({
      icon: null,
      name: v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase(),
      projectId: result.id,
      type: v as ProjectViewType,
      data: {},
      order: ++viewOrder,
      createdAt: new Date(),
      createdBy: userId,
      updatedBy: null,
      updatedAt: null
    }))


    // console.log('create rest views but the first one', restViewDatas.length)

    restViewDatas.length && await tx.projectView.createMany({
      data: restViewDatas
    })

    // console.log('create first view')
    const firstProjectView = await tx.projectView.create({
      data: defaultView
    })

    // console.log('updating first view to project', firstProjectView.id)
    await tx.project.update({
      where: {
        id: result.id
      },
      data: {
        projectViewId: firstProjectView.id
      }
    })

    // Add default project views - END

    // Add project members - START
    const memberDatas = members.map(m => ({
      uid: m,
      projectId: result.id,
      role: m === userId ? MemberRole.MANAGER : MemberRole.MEMBER,
      createdAt: new Date(),
      createdBy: userId,
      updatedBy: null,
      updatedAt: null
    }))

    const memberPromise = tx.members.createMany({
      data: memberDatas
    })

    // Add project members - END

    // console.log('start inserting default status, point and members')
    const promises = await Promise.all([
      memberPromise
    ])

    await Promise.all(promises)

  })

}
