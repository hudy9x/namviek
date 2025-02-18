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

import { CKEY, delCache, setJSONCache } from '../../lib/redis'
import PinRouter from './pin'
import { pmClient } from 'packages/database/src/lib/_prisma'
import { PROJECT_TEMPLATES } from '@namviek/core'
import { TemplateService } from '../../services/template'

const router = Router()

router.use([authMiddleware])

router.use([PinRouter])

const templateService = new TemplateService()

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
  const { templateId, ...body } = req.body as {
    icon: string
    name: string
    desc: string
    views: string[]
    members: string[]
    templateId?: string
    organizationId: string
  }
  const { id: userId } = req.authen

  console.log('Creating project with data:', {
    name: body.name,
    hasTemplate: !!templateId,
    viewsCount: body.views.length,
    membersCount: body.members.length
  })

  try {
    pmClient.$transaction(async tx => {
      console.log('create project')
      const project = await tx.project.create({
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

      console.log('project created', project.id)

      // Add default project views - START
      const [theFirstView, ...restView] = body.views

      let viewOrder = 1
      const defaultView = {
        icon: null,
        name: theFirstView.slice(0, 1).toUpperCase() + theFirstView.slice(1).toLowerCase(),
        projectId: project.id,
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
        projectId: project.id,
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
          id: project.id
        },
        data: {
          projectViewId: firstProjectView.id
        }
      })

      // Add project members - START
      const memberDatas = body.members.map(m => ({
        uid: m,
        projectId: project.id,
        role: m === userId ? MemberRole.MANAGER : MemberRole.MEMBER,
        createdAt: new Date(),
        createdBy: userId,
        updatedBy: null,
        updatedAt: null
      }))

      const memberPromise = tx.members.createMany({
        data: memberDatas
      })

      // Apply template if specified
      console.log('template id:', templateId)
      if (templateId) {
        const template = PROJECT_TEMPLATES.find(t => t.id === templateId)
        if (template) {
          console.log(`Applying template: ${template.name}`)
          await templateService.createFromTemplate(tx, template, project.id, userId)
        }
      }

      console.log('Starting to create all fields...')
      const promises = [memberPromise]
      await Promise.all(promises)
      console.log('All fields created successfully')

      delCache([CKEY.USER_PROJECT, userId])

      const retData: Project = { ...project, projectViewId: firstProjectView.id }
      console.log('delete cache done', retData)

      console.log('Project creation completed successfully')
      res.json({
        status: 200,
        data: retData
      })
    }, { timeout: 25000 })
  } catch (error) {
    console.error('Project creation failed:', error)
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
