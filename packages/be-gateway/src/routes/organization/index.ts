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
  mdOrgGetOne,
  mdOrgGetOwned,
  mdOrgMemAdd,
  mdOrgMemGetByUid,
  mdOrgUpdate
} from '@shared/models'
import orgMembers from './members'
import { CKEY, delCache, getJSONCache, setJSONCache } from '../../lib/redis'
import { MAX_STORAGE_SIZE } from '../storage'

const router = Router()

router.use([authMiddleware])

router.use([orgMembers])

router.get('/org/:orgId', async (req: AuthRequest, res) => {
  const { orgId } = req.params as { orgId: string }
  const result = await mdOrgGetOne(orgId)

  res.json({
    status: 200,
    data: result
  })
})

router.get('/org', async (req: AuthRequest, res) => {
  try {
    const { id } = req.authen

    const key = [CKEY.USER_ORGS, id]
    const cached = await getJSONCache(key)
    if (cached) {
      console.log('return cached org list 2')
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
    const body = req.body as Pick<Organization, 'name' | 'desc' | 'cover'>
    const { id } = req.authen
    const key = [CKEY.USER_ORGS, id]

    const ownedOrgs = await mdOrgGetOwned(id)

    if (ownedOrgs.length > 1) {
      return res.status(500).send('REACHED_MAX_ORGANIZATION')
    }

    const result = await mdOrgAdd({
      name: body.name,
      desc: body.desc,
      maxStorageSize: MAX_STORAGE_SIZE,
      cover: body.cover,
      avatar: null,
      createdAt: new Date(),
      createdBy: id,
      updatedAt: null,
      updatedBy: null
    })

    delCache(key)

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

router.put('/org', async (req: AuthRequest, res) => {
  try {
    const body = req.body as Pick<Organization, 'name' | 'desc' | 'cover' | 'id'>
    const { id } = req.authen
    const key = [CKEY.USER_ORGS, id]

    const result = await mdOrgUpdate(body.id, {
      name: body.name,
      desc: body.desc,
      cover: body.cover,
      avatar: null,
      updatedAt: new Date(),
      updatedBy: id
    })

    delCache(key)

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log('create org error', error)
    res.json({ status: 500, error })
  }
})

export default router
