import {
  InvitationStatus,
  Organization,
  OrganizationRole
} from '@prisma/client'
import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdOrgAdd,
  mdOrgGet,
  mdOrgMemAdd,
  mdOrgMemGetByUid
} from '@shared/models'
import orgMembers from './members'
import { CKEY, delCache, getJSONCache, setJSONCache } from '../../lib/redis'

const router = Router()

router.use([authMiddleware])

router.use([orgMembers])

router.get('/org', async (req: AuthRequest, res) => {
  try {
    const { id } = req.authen

    const key = [CKEY.USER_ORGS, id]
    const cached = await getJSONCache(key)
    if (cached) {
      console.log('return cached org list')
      return res.json({
        status: 200,
        data: cached
      })
    }

    const orgIds = await mdOrgMemGetByUid(id)
    const orgs = await mdOrgGet(orgIds.map(org => org.organizationId))

    setJSONCache(key, orgs)

    res.setHeader('Cache-Control', 'max-age=20, public')

    res.json({
      status: 200,
      data: orgs
    })
  } catch (error) {
    res.json({
      status: 500,
      error
    })
  }
})

router.post('/org', async (req: AuthRequest, res) => {
  try {
    const body = req.body as Pick<Organization, 'name' | 'desc'>
    const { id } = req.authen
    const key = [CKEY.USER_ORGS, id]

    console.log('called organization')
    console.log(body)
    console.log(req.authen)

    const result = await mdOrgAdd({
      name: body.name,
      desc: body.desc,
      cover: null,
      avatar: null,
      createdAt: new Date(),
      createdBy: id,
      updatedAt: null,
      updatedBy: null
    })

    delCache(key)

    console.log('created', result)

    await mdOrgMemAdd({
      uid: id,
      status: InvitationStatus.ACCEPTED,
      organizationId: result.id,
      role: OrganizationRole.ADMIN,
      createdAt: new Date(),
      createdBy: id,
      updatedAt: null,
      updatedBy: null
    })

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log('create org error', error)
    res.json({ status: 500, error })
  }
})

export default router
