import { Router } from 'express'
import {
  createPresignedUrlWithClient,
  deleteObject,
  getObject,
  getObjectURL,
  randomObjectKeyName
} from '@be/storage'
import {
  mdActivityAdd,
  mdActivityGetAllByTask,
  mdMemberAdd,
  mdStorageAdd,
  mdStorageGet,
  mdStorageGetByOwner,
  mdStorageGetOne
} from '@shared/models'
import { Activity, FileOwnerType, FileStorage } from '@prisma/client'
import { AuthRequest } from '../../types'

const router = Router()

router.get('/project/task/activity', async (req: AuthRequest, res) => {
  const { objectId } = req.query as { objectId: string }

  try {
    const results = await mdActivityGetAllByTask(objectId)
    res.json({ status: 200, data: results })
  } catch (error) {
    res.json({
      status: 500,
      err: error,
      data: []
    })
  }
})

router.post('/project/task/activity', async (req: AuthRequest, res, next) => {
  const body = req.body as Omit<Activity, 'id'>
  console.log({ body })
  try {
    mdActivityAdd(body)
  } catch (error) {
    console.log({ error })
    res.json({
      status: 500,
      err: error
    })
  }
})

// router.delete('/del-file', async (req: AuthRequest, res) => {
//   const { id, projectId } = req.query as { id: string; projectId: string }
//   const key = [CKEY.TASK_QUERY, projectId]
//
//   pmClient
//     .$transaction(async tx => {
//       const result = await tx.fileStorage.findFirst({
//         where: {
//           id
//         }
//       })
//
//       const { id: fileId, owner, ownerType, keyName } = result
//
//       if (ownerType === FileOwnerType.TASK) {
//         const task = await tx.task.findFirst({
//           where: {
//             id: owner
//           }
//         })
//
//         const { fileIds } = task
//
//         if (!fileIds.includes(fileId)) {
//           // return 'FILE_NOT_EXIST_IN_TASK'
//           throw new Error('FILE_NOT_EXIST_IN_TASK')
//         }
//
//         task.fileIds = fileIds.filter(f => f !== fileId)
//
//         delete task.id
//
//         const promises = []
//         promises.push(
//           tx.fileStorage.delete({
//             where: { id: fileId }
//           })
//         )
//
//         promises.push(
//           tx.task.update({
//             where: {
//               id: owner
//             },
//             data: task
//           })
//         )
//
//         await Promise.all(promises)
//         await deleteObject(keyName)
//         await findNDelCaches(key)
//
//         return {
//           deletedFileId: fileId,
//           remainFileIds: task.fileIds
//         }
//       }
//
//       // FIXME: this case only occurs as user create a new file in drive directly
//       // so, if it is not belong to no one, delete it
//       return 'CANNOT_DELETE_NO_OWNER'
//     })
//     .then(message => {
//       console.log('delete file result: ', message)
//       res.json({ status: 200, data: message })
//     })
//     .catch(err => {
//       console.log('error delete file', err)
//       res.status(500).send(err)
//     })
// })
//
// router.get('/get-files-by-owner', async (req: AuthRequest, res) => {
//   try {
//     const { ownerId, ownerType } = req.query as {
//       ownerId: string
//       ownerType: FileOwnerType
//     }
//
//     const result = await mdStorageGetByOwner(ownerId, ownerType)
//
//     res.json({ status: 200, data: result })
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })
//
// router.post('/save-to-drive', async (req: AuthRequest, res, next) => {
//   const { id: uid } = req.authen
//   const {
//     organizationId,
//     owner,
//     ownerType,
//     projectId,
//     name,
//     keyName,
//     type,
//     url,
//     size,
//     mimeType,
//     parentId
//   } = req.body as FileStorage
//
//   const result = await mdStorageAdd({
//     organizationId,
//     projectId,
//     name,
//     keyName,
//     type,
//     url,
//     size,
//     mimeType,
//     parentId: parentId || null,
//     isDeleted: false,
//     owner,
//     ownerType,
//     createdAt: new Date(),
//     createdBy: uid,
//     deletedAt: null,
//     deletedBy: null
//   })
//
//   res.status(200).json({
//     data: result
//   })
// })
//
// router.get('/get-object-url', async (req, res, next) => {
//   try {
//     const { name } = req.query as { name: string }
//     const url = await getObject(name)
//     res.json({ data: url })
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })
//
// router.delete('/delete-obeject', async (req, res, next) => {
//   try {
//     const { name } = req.query as { name: string }
//     const result = await deleteObject(name)
//     res.json({
//       status: 200,
//       data: result
//     })
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })
//
export default router
