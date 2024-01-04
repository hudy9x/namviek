import { Router } from 'express'
import {
  createPresignedUrlWithClient,
  deleteObject,
  getObject,
  getObjectURL,
  randomObjectKeyName
} from '@be/storage'
import {
  mdOrgGetOne,
  mdProjectGetOrgId,
  mdStorageAdd,
  mdStorageGet,
  mdStorageGetByOwner,
  mdStorageGetOne
} from '@shared/models'
import { FileOwnerType, FileStorage } from '@prisma/client'
import { AuthRequest } from '../../types'
import { pmClient } from 'packages/shared-models/src/lib/_prisma'
import { CKEY, findNDelCaches } from '../../lib/redis'
import StorageCache from '../../caches/StorageCache'

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

  const randName = `${orgId}/${projectId}/` + randomObjectKeyName(name)
  const presignedUrl = await createPresignedUrlWithClient(randName, type)
  const { organizationId } = await mdProjectGetOrgId(projectId)
  const storageCache = new StorageCache(organizationId)
  const totalSize = await storageCache.getTotalSize()
  const { maxStorageSize } = await mdOrgGetOne(organizationId)

  console.log('totalSize', totalSize)
  console.log('maxStorageSize', maxStorageSize)

  if (maxStorageSize && totalSize > maxStorageSize) {
    res.status(500).send('MAX_SIZE_STORAGE')
    return
  }

  if (totalSize > MAX_STORAGE_SIZE) {
    res.status(500).send('MAX_SIZE_STORAGE')
    return
  }

  res.status(200).json({
    data: {
      name: randName,
      presignedUrl,
      url: getObjectURL(randName)
    }
  })
})

router.delete('/del-file', async (req: AuthRequest, res) => {
  const { id, projectId } = req.query as { id: string; projectId: string }
  try {
    const key = [CKEY.TASK_QUERY, projectId]

    const { organizationId } = await mdProjectGetOrgId(projectId)
    const storageCache = new StorageCache(organizationId)

    pmClient
      .$transaction(async tx => {
        const result = await tx.fileStorage.findFirst({
          where: {
            id
          }
        })

        const { id: fileId, owner, ownerType, keyName } = result

        if (ownerType === FileOwnerType.TASK) {
          const task = await tx.task.findFirst({
            where: {
              id: owner
            }
          })

          const { fileIds } = task

          if (!fileIds.includes(fileId)) {
            // return 'FILE_NOT_EXIST_IN_TASK'
            throw new Error('FILE_NOT_EXIST_IN_TASK')
          }

          task.fileIds = fileIds.filter(f => f !== fileId)

          delete task.id

          const promises = []
          promises.push(
            tx.fileStorage.delete({
              where: { id: fileId }
            })
          )

          promises.push(
            tx.task.update({
              where: {
                id: owner
              },
              data: task
            })
          )

          await Promise.all(promises)
          await deleteObject(keyName)
          await findNDelCaches(key)

          // decrease storage size
          const file = await mdStorageGetOne(fileId)
          if (file && file.size) {
            storageCache.decrSize(file.size)
          }

          return {
            deletedFileId: fileId,
            remainFileIds: task.fileIds
          }
        }

        // FIXME: this case only occurs as user create a new file in drive directly
        // so, if it is not belong to no one, delete it
        return 'CANNOT_DELETE_NO_OWNER'
      })
      .then(message => {
        console.log('delete file result: ', message)
        res.json({ status: 200, data: message })
      })
      .catch(err => {
        console.log('error delete file', err)
        res.status(500).send(err)
      })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/get-files', async (req: AuthRequest, res) => {
  const { ids } = req.query as { ids: string[] }
  console.log('get files')

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

router.get('/get-object-url', async (req, res, next) => {
  try {
    const { name } = req.query as { name: string }
    const url = await getObject(name)
    res.json({ data: url })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/delete-obeject', async (req, res, next) => {
  try {
    const { name } = req.query as { name: string }
    const result = await deleteObject(name)
    res.json({
      status: 200,
      data: result
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

export const storageRouter = router
