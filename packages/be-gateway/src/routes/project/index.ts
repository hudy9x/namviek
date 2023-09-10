import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdMemberAdd,
  mdMemberGetProject,
  mdProjectAdd,
  mdProjectGetAllByIds,
  mdProjectUpdate
} from '@shared/models'
import { MemberRole, Project } from '@prisma/client'

import StatusRouter from './status'
import TagRouter from './tag'
import PointRouter from './point'
import { CKEY, delCache, getJSONCache, setJSONCache } from '../../lib/redis'

const router = Router()

router.use([authMiddleware])

router.use([StatusRouter, TagRouter, PointRouter])

// It means GET:/api/project
router.get('/project', async (req: AuthRequest, res) => {
  const { id: userId } = req.authen
  const key = [CKEY.USER_PROJECT, userId]

  try {
    const cached = await getJSONCache(key)
    if (cached) {
      console.log('return cached project')
      return res.json({
        status: 200,
        data: cached
      })
    }
    const invitedProjects = await mdMemberGetProject(userId)

    if (!invitedProjects) {
      console.log("You're not invited to no projects")
      return res.json({
        status: 200,
        data: []
      })
    }

    const projectIds = invitedProjects.map(p => p.projectId)
    const projects = await mdProjectGetAllByIds(projectIds)

    setJSONCache(key, projects)

    console.log('get project success')

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

  const result = await mdProjectAdd({
    cover: null,
    icon: body.icon || '',
    name: body.name,
    desc: body.desc,
    createdBy: userId,
    createdAt: new Date(),
    organizationId: body.organizationId,
    updatedAt: null,
    updatedBy: null
  })

  await mdMemberAdd({
    uid: userId,
    projectId: result.id,
    role: MemberRole.MANAGER,
    createdAt: new Date(),
    createdBy: userId,
    updatedBy: null,
    updatedAt: null
  })

  delCache([CKEY.USER_PROJECT, userId])

  res.json({
    status: 200,
    data: result
  })
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
