import { MemberRole, Project, StatusType } from '@prisma/client'
import {
  mdMemberAdd,
  mdMemberGetProject,
  mdProjectAdd,
  mdProjectGetAllByIds,
  mdProjectUpdate,
  mdTaskPointAddMany,
  mdTaskStatusAddMany
} from '@shared/models'
import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'

import { CKEY, delCache, getJSONCache, setJSONCache } from '../../lib/redis'
import PointRouter from './point'
import StatusRouter from './status'
import TagRouter from './tag'
import PinRouter from './pin'

const router = Router()

router.use([authMiddleware])

router.use([StatusRouter, TagRouter, PointRouter, PinRouter])

// It means GET:/api/project
router.get('/project', async (req: AuthRequest, res) => {
  const { id: userId } = req.authen
  const { isArchived, orgId } = req.query as { isArchived: string, orgId: string }
  const key = [CKEY.USER_PROJECT, userId]

  console.log('orgId', orgId)

  try {
    const cached = await getJSONCache(key)
    // if (cached) {
    //   console.log('return cached project')
    //   return res.json({
    //     status: 200,
    //     data: cached
    //   })
    // }
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
    organizationId: string
  }
  const { id: userId } = req.authen

  console.log('project data:', body)
  try {
    const result = await mdProjectAdd({
      cover: null,
      icon: body.icon || '',
      name: body.name,
      desc: body.desc,
      createdBy: userId,
      isArchived: false,
      createdAt: new Date(),
      organizationId: body.organizationId,
      updatedAt: null,
      updatedBy: null
    })

    // init status task
    const initialStatusData = [
      {
        color: '#d9d9d9',
        name: 'TODO',
        order: 0,
        projectId: result.id,
        type: StatusType.TODO
      },
      {
        color: '#4286f4',
        name: 'INPROGRESS',
        order: 1,
        projectId: result.id,
        type: StatusType.INPROCESS
      },
      {
        color: '#4caf50',
        name: 'CLOSED',
        order: 2,
        projectId: result.id,
        type: StatusType.DONE
      }
    ]

    const initialPointData = [
      { point: 1, projectId: result.id, icon: null },
      { point: 2, projectId: result.id, icon: null },
      { point: 3, projectId: result.id, icon: null },
      { point: 5, projectId: result.id, icon: null },
      { point: 8, projectId: result.id, icon: null }
    ]

    const promise = [
      mdTaskStatusAddMany(initialStatusData),
      mdTaskPointAddMany(initialPointData),
      mdMemberAdd({
        uid: userId,
        projectId: result.id,
        role: MemberRole.MANAGER,
        createdAt: new Date(),
        createdBy: userId,
        updatedBy: null,
        updatedAt: null
      })
    ]

    await Promise.all(promise)

    delCache([CKEY.USER_PROJECT, userId])

    res.json({
      status: 200,
      data: result
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.put('/project', async (req: AuthRequest, res) => {
  const { id, icon, name, desc, organizationId } = req.body as {
    id: string
    icon: string
    name: string
    desc: string
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

  const result = await mdProjectUpdate(updateData)

  delCache([CKEY.USER_PROJECT, userId])

  res.json({
    status: 200,
    data: result
  })
})

export default router
