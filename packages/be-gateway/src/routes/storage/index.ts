import { Router } from 'express'
import {
  getObjectURL,
} from '@be/storage'
import {
  mdOrgGetOne,
  mdStorageAdd,
  mdStorageGet,
  mdStorageGetByOwner,
  mdStorageGetOne,
  mdTaskGetOne,
  mdTaskUpdate
} from '@shared/models'
import { FileOwnerType, FileStorage } from '@prisma/client'
import { AuthRequest } from '../../types'
import { fileStorageModel, pmClient } from 'packages/shared-models/src/lib/_prisma'
import { CKEY, findNDelCaches } from '../../lib/redis'
import StorageCache from '../../caches/StorageCache'
import { StorageService } from '../../services/storage.service'
import MaxStorageSizeException from '../../exceptions/MaxStorageSizeException'

const router = Router()

export const MAX_STORAGE_SIZE = 100 * 1024 * 1024 // 100Mb
router.get('/current-storage-size', async (req, res) => {
  const { orgId } = req.query as { orgId: string }
  if (!orgId) {
    return res.status(500).send('ORG_MUST_PROVIDED')
  }

  const storageCache = new StorageCache(orgId)
  const totalSize = await storageCache.getTotalSize()

  const { maxStorageSize } = await mdOrgGetOne(orgId)

  res.json({
    status: 200,
    data: {
      maximum: maxStorageSize || MAX_STORAGE_SIZE,
      total: totalSize
    }
  })
})

router.post('/create-presigned-url', async (req, res, next) => {

  const { name, type, orgId, projectId } = req.body as {
    name: string
    type: string
    projectId: string
    orgId: string
  }

  try {
    const storageService = new StorageService(orgId)

    const isExceed = await storageService.exceedMaxStorageSize()
    if (isExceed) {
      throw new MaxStorageSizeException()
    }

    const { presignedUrl, randName } = await storageService.createPresignedUrl({
      projectId,
      name,
      type
    })

    console.log('generate presigned', presignedUrl)

    res.status(200).json({
      data: {
        name: randName,
        presignedUrl,
        url: getObjectURL(randName)
      }
    })


  } catch (error) {
    console.log(error)
    res.status(error.status).send(error.message)
  }

})

router.delete('/del-file', async (req: AuthRequest, res) => {
  const { id, projectId, orgId } = req.query as { id: string; projectId: string, orgId: string }
  try {
    const key = [CKEY.TASK_QUERY, projectId]
    const storageService = new StorageService(orgId)

    // 1. find file's owner inside storage collection
    const { id: fileId, owner, ownerType, keyName } = await fileStorageModel.findFirst({
      where: {
        id
      }
    })


    if (ownerType === FileOwnerType.TASK) {
      // 2. remove the file from it's owner
      storageService.removeFileFromOwner(owner, fileId)

      // 3. delete file from s3, clear cache and decrease current volume
      await storageService.removeFileFromStorage(keyName, key, fileId)

      res.json({
        status: 200,
      })
    }

  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/get-files', async (req: AuthRequest, res) => {
  const { ids } = req.query as { ids: string[] }

  try {
    const results = await mdStorageGet(ids)
    res.json({ status: 200, data: results })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/get-files-by-owner', async (req: AuthRequest, res) => {
  try {
    const { ownerId, ownerType } = req.query as {
      ownerId: string
      ownerType: FileOwnerType
    }

    const result = await mdStorageGetByOwner(ownerId, ownerType)

    res.json({ status: 200, data: result })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/save-to-drive', async (req: AuthRequest, res, next) => {
  const { id: uid } = req.authen
  const {
    organizationId,
    owner,
    ownerType,
    projectId,
    name,
    keyName,
    type,
    url,
    size,
    mimeType,
    parentId
  } = req.body as FileStorage

  try {
    if (size) {
      const storageCache = new StorageCache(organizationId)
      await storageCache.incrSize(size)
    }

    const result = await mdStorageAdd({
      organizationId,
      projectId,
      name,
      keyName,
      type,
      url,
      size,
      mimeType,
      parentId: parentId || null,
      isDeleted: false,
      owner,
      ownerType,
      createdAt: new Date(),
      createdBy: uid,
      deletedAt: null,
      deletedBy: null
    })

    res.status(200).json({
      data: result
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

// router.get('/get-object-url', async (req, res, next) => {
//   try {
//     const { name } = req.query as { name: string }
//     const url = await getObject(name)
//     res.json({ data: url })
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

export const storageRouter = router
