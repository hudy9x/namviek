import { storageDelFile } from '@/services/storage'
import { Button, confirmAlert, messageError, messageSuccess } from '@shared/ui'
import { useParams, useSearchParams } from 'next/navigation'
import { IFileItem, useFileKitContext } from './context'
import { useTaskStore } from '@/store/task'
import { useUser } from '@goalie/nextjs'

export default function FileDelete({ id }: { id: string }) {
  const { previewFiles, setPreviewFiles, taskId } = useFileKitContext()

  const { user } = useUser()
  const { updateTask } = useTaskStore()
  const { projectId, orgID } = useParams()
  // const sp = useSearchParams()
  // const taskId = sp.get('taskId')

  const doDelete = () => {
    if (!taskId || !id) {
      messageError('Can not deleted! Task or file is not exist')
      return
    }

    const remainFileIds: string[] = []
    const remainFileItems: IFileItem[] = []

    previewFiles.map(pf => {
      if (pf.id && pf.id !== id) {
        remainFileItems.push(pf)
        remainFileIds.push(pf.id)
      }
    })

    console.log('previewFiles', remainFileIds, remainFileItems)

    setPreviewFiles(remainFileItems)

    updateTask({
      updatedBy: user?.id,
      ...{
        id: taskId,
        fileIds: remainFileIds
      }
    })

    storageDelFile({
      id,
      orgId: orgID,
      projectId
    }).then(res => {
      // const { data } = res.data
      messageSuccess('delete file successfully')
    })
  }

  const onDeleteHandler = () => {
    confirmAlert({
      message: 'Are you sure you want to delete this file ?',
      yes: () => {
        doDelete()
      }
    })
  }

  return <Button title="Delete" size="sm" onClick={onDeleteHandler} />
}
