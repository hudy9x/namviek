import {
  MemberRole,
  Project,
  ProjectViewType,
} from '@prisma/client'
import {
  mdMemberGetProject,
  mdProjectGetAllByIds,
  mdProjectUpdate,
} from '@database'
import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'

import { CKEY, delCache, getJSONCache, setJSONCache } from '../../lib/redis'
import PinRouter from './pin'
import { pmClient } from 'packages/database/src/lib/_prisma'

const router = Router()

router.use([authMiddleware])

router.use([PinRouter])

// It means GET:/api/project
router.get('/project', async (req: AuthRequest, res) => {
  const { id: userId } = req.authen
  const { isArchived, orgId } = req.query as {
    isArchived: string
    orgId: string
  }
  const key = [CKEY.USER_PROJECT, userId]

  console.log('orgId', orgId)

  try {
    const invitedProjects = await mdMemberGetProject(userId)

    if (!invitedProjects) {
      console.log("You're not invited to no projects")
      return res.json({
        status: 200,
        data: []
      })
    }

    console.log('get projects that not archived and same org')

    const projectIds = invitedProjects.map(p => p.projectId)
    const projects = await mdProjectGetAllByIds(projectIds, {
      orgId,
      isArchived: isArchived === 'true'
    })

    setJSONCache(key, projects)

    // res.setHeader('Cache-Control', 'max-age=20, public')
    res.json({
      status: 200,
      data: projects
    })
  } catch (error) {
    console.log('get project by member error', error)
    res.json({
      status: 500,
      err: error,
      data: []
    })
  }
})

// It means POST:/api/project
router.post('/project', async (req: AuthRequest, res) => {
  const body = req.body as {
    icon: string
    name: string
    desc: string
    views: string[]
    members: string[]
    organizationId: string
  }
  const { id: userId } = req.authen

  console.log('project data:', body.views, body.members)
  try {
    const views = body.views
    const members = body.members

    pmClient.$transaction(async tx => {

      console.log('create project')
      const result = await tx.project.create({
        data: {
          cover: null,
          icon: body.icon || '',
          projectViewId: null,
          name: body.name,
          desc: body.desc,
          createdBy: userId,
          isArchived: false,
          createdAt: new Date(),
          organizationId: body.organizationId,
          updatedAt: null,
          updatedBy: null
        }
      })

      console.log('project created', result.id)

      // Add default project views - START

      const [theFirstView, ...restView] = views

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


      console.log('create rest views but the first one', restViewDatas.length)

      restViewDatas.length && await tx.projectView.createMany({
        data: restViewDatas
      })

      console.log('create first view')
      const firstProjectView = await tx.projectView.create({
        data: defaultView
      })

      console.log('updating first view to project', firstProjectView.id)
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



      console.log('start inserting default status, point and members')
      const promises = await Promise.all([
        memberPromise

      ])

      await Promise.all(promises)

      console.log('done')

      delCache([CKEY.USER_PROJECT, userId])

      const retData: Project = { ...result, projectViewId: firstProjectView.id }
      console.log('delete cache done', retData)

      res.json({
        status: 200,
        data: retData
      })
    })


  } catch (error) {
    console.log('project add error ', error)
    res.status(500).send(error)
  }
})

router.put('/project', async (req: AuthRequest, res) => {
  const { id, icon, name, desc, projectViewId, organizationId } = req.body as {
    id: string
    icon: string
    name: string
    desc: string
    projectViewId: string
    organizationId: string
  }
  const { id: userId } = req.authen

  if (!id) {
    return res.status(400).json({ error: 'Missing project id' })
  }

  const updateData: Partial<Project> = {
    id,
    updatedAt: new Date(),
    updatedBy: userId
  }

  if (name) {
    updateData.name = name
  }

  if (desc) {
    updateData.desc = desc
  }

  if (icon) {
    updateData.icon = icon
  }

  if (organizationId) {
    updateData.organizationId = organizationId
  }

  if (projectViewId) {
    updateData.projectViewId = projectViewId
  }

  const result = await mdProjectUpdate(updateData)

  delCache([CKEY.USER_PROJECT, userId])

  res.json({
    status: 200,
    data: result
  })
})

export default router
