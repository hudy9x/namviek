import {
  MemberRole,
  Project,
  ProjectViewType,
  StatusType
} from '@prisma/client'
import {
  mdMemberAdd,
  mdMemberGetProject,
  mdProjectAdd,
  mdProjectGetAllByIds,
  mdProjectUpdate,
  mdProjectView,
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
import { pmClient } from 'packages/shared-models/src/lib/_prisma'

const router = Router()

router.use([authMiddleware])

router.use([StatusRouter, TagRouter, PointRouter, PinRouter])

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

      // Prepare default data - START

      const initialPointData = [
        { point: 1, projectId: result.id, icon: null },
        { point: 2, projectId: result.id, icon: null },
        { point: 3, projectId: result.id, icon: null },
        { point: 5, projectId: result.id, icon: null },
        { point: 8, projectId: result.id, icon: null }
      ]

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
      // Prepare default data - END

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


      // Add default project status - START
      const projectStatusPromise = tx.taskStatus.createMany({
        data: initialStatusData
      })
      // Add default project status - END


      const taskPointPromise = tx.taskPoint.createMany({
        data: initialPointData
      })

      console.log('start inserting default status, point and members')
      const promises = await Promise.all([
        projectStatusPromise,
        taskPointPromise,
        memberPromise

      ])

      // const promise = [
      //   mdTaskStatusAddMany(initialStatusData),
      //   mdTaskPointAddMany(initialPointData),
      //   mdMemberAdd({
      //     uid: userId,
      //     projectId: result.id,
      //     role: MemberRole.MANAGER,
      //     createdAt: new Date(),
      //     createdBy: userId,
      //     updatedBy: null,
      //     updatedAt: null
      //   })
      // ]

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


    // ////////////////////////////////////////
    // ////////////////////////////////////////
    // ////////////////////////////////////////
    // ////////////////////////////////////////
    // ////////////////////////////////////////
    // ////////////////////////////////////////
    // ////////////////////////////////////////
    // ////////////////////////////////////////

    // const result = await mdProjectAdd({
    //   cover: null,
    //   icon: body.icon || '',
    //   projectViewId: null,
    //   name: body.name,
    //   desc: body.desc,
    //   createdBy: userId,
    //   isArchived: false,
    //   createdAt: new Date(),
    //   organizationId: body.organizationId,
    //   updatedAt: null,
    //   updatedBy: null
    // })
    //
    // // init status task
    // const initialStatusData = [
    //   {
    //     color: '#d9d9d9',
    //     name: 'TODO',
    //     order: 0,
    //     projectId: result.id,
    //     type: StatusType.TODO
    //   },
    //   {
    //     color: '#4286f4',
    //     name: 'INPROGRESS',
    //     order: 1,
    //     projectId: result.id,
    //     type: StatusType.INPROCESS
    //   },
    //   {
    //     color: '#4caf50',
    //     name: 'CLOSED',
    //     order: 2,
    //     projectId: result.id,
    //     type: StatusType.DONE
    //   }
    // ]
    //
    // const initialPointData = [
    //   { point: 1, projectId: result.id, icon: null },
    //   { point: 2, projectId: result.id, icon: null },
    //   { point: 3, projectId: result.id, icon: null },
    //   { point: 5, projectId: result.id, icon: null },
    //   { point: 8, projectId: result.id, icon: null }
    // ]
    //
    // const initialProjectView = {
    //   icon: null,
    //   name: 'Board',
    //   projectId: result.id,
    //   type: ProjectViewType.BOARD,
    //   data: {},
    //   order: null,
    //   createdAt: new Date(),
    //   createdBy: userId,
    //   updatedBy: null,
    //   updatedAt: null
    // }
    //
    // const defaultView = await mdProjectView.add(initialProjectView)
    // await mdProjectUpdate({ id: result.id, projectViewId: defaultView.id })
    //
    // const promise = [
    //   mdTaskStatusAddMany(initialStatusData),
    //   mdTaskPointAddMany(initialPointData),
    //   mdMemberAdd({
    //     uid: userId,
    //     projectId: result.id,
    //     role: MemberRole.MANAGER,
    //     createdAt: new Date(),
    //     createdBy: userId,
    //     updatedBy: null,
    //     updatedAt: null
    //   })
    // ]
    //
    // await Promise.all(promise)
    //
    // delCache([CKEY.USER_PROJECT, userId])
    //
    // res.json({
    //   status: 200,
    //   data: result
    // })
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
