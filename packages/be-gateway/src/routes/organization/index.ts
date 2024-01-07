import {
  InvitationStatus,
  OrgStorageType,
  Organization,
  OrganizationRole,
  OrganizationStorage
} from '@prisma/client'
import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  OrgStorageRepository,
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
import { IStorageAWSConfig } from '../../services/organizationStorage.service'
import { access } from 'fs'

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

    if (ownedOrgs.length >= 1) {
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

router.get('/org-storage', async (req: AuthRequest, res) => {
  try {

    const { orgId } = req.query as { orgId: string }
    const orgRepo = new OrgStorageRepository()
    const data = await orgRepo.getAwsConfig(orgId)

    res.json({
      data: data.config
    })
  } catch (error) {
    res.status(500).send(error)
  }

})

router.put('/org-storage', async (req: AuthRequest, res) => {
  try {
    const { orgId, config } = req.body as {
      orgId: string
      config: IStorageAWSConfig
    }

    const { id } = req.authen

    const { bucketName, region, secretKey, accessKey } = config

    console.log('update org storage 2')

    if (!bucketName || !region || !secretKey || !access) {
      throw new Error('Invalid AWS S3 configuration ')
    }

    const orgRepo = new OrgStorageRepository()
    const result = await orgRepo.updateOrCreateAwsConfig(orgId, {
      organizationId: orgId,
      config: {
        bucketName,
        region,
        secretKey,
        accessKey
      },
      type: OrgStorageType.AWS_S3,
      createdAt: new Date(),
      createdBy: id,
      updatedAt: null,
      updatedBy: null
    })

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log('create or update  org storage error', error)
    res.json({ status: 500, error })
  }
})


router.put('/org', async (req: AuthRequest, res) => {
  try {
    const body = req.body as Pick<
      Organization,
      'name' | 'desc' | 'cover' | 'id'
    >
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
