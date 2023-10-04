import { Router } from 'express'
import {
  createPresignedUrlWithClient,
  deleteObject,
  getObject,
  getObjectURL,
  randomObjectKeyName
} from '@be/storage'
import { mdStorageAdd } from '@shared/models'
import { FileStorage } from '@prisma/client'
import { AuthRequest } from '../../types'

const router = Router()

router.post('/create-presigned-url', async (req, res, next) => {
  const { name, type, orgId, projectId } = req.body as {
    name: string
    type: string
    projectId: string
    orgId: string
  }

  const randName = `${orgId}/${projectId}/` + randomObjectKeyName(name)
  const presignedUrl = await createPresignedUrlWithClient(randName, type)

  res.status(200).json({
    data: {
      name: randName,
      presignedUrl,
      url: getObjectURL(randName)
    }
  })
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
