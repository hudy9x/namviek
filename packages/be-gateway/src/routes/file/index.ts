import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import { mdStorageByOrgId } from '@shared/models'
import { StorageBase } from '@storage/libs'

const router = Router()

router.use([authMiddleware])

// check config by admin org
router.post('/upload-file', async (req: AuthRequest, res) => {
  try {
    const { path, orgID } = req.body
    const storageData = await mdStorageByOrgId(orgID)

    const storage = new StorageBase({
      ...storageData,
      config: storageData.config as any
    })

    const url = await storage.upload(path)

    return res.status(200).json({
      type: storageData.type,
      url: url
    })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

export default router
