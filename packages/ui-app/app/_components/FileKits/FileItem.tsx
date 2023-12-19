import { Button, Loading, messageSuccess } from '@shared/ui'
import FileThumb from './FileThumb'
import { IFileItem } from './context'
import FileDelete from './FileDelete'
import { format, formatDistanceToNow } from 'date-fns'
import { useParams, useSearchParams } from 'next/navigation'
import { taskMakeCover } from '@/services/task'
import { useTaskStore } from '@/store/task'

const generateSizeStr = (size: number) => {
  const n = size / 1024
  if (n < 1000) {
    return `${n.toFixed(2)} Kb`
  }

  const m = n / 1024

  if (m < 1000) {
    return `${m.toFixed(2)} Mb`
  }

  const l = m / 1024

  return `${l.toFixed(2)} Gb`
}

export default function FileItem({ data }: { data: IFileItem }) {
  const { name, url, ext, mimeType, uploading, id, createdAt } = data
  const sp = useSearchParams()
  const taskId = sp.get('taskId')
  const { projectId } = useParams()
  const { updateTask } = useTaskStore()

  const createdDate = createdAt
    ? formatDistanceToNow(new Date(createdAt))
    : null
  const createdTime = createdAt ? format(new Date(createdAt), 'HH:mm') : null

  const makeThisCover = () => {
    if (!taskId) return

    updateTask({
      id: taskId,
      cover: url
    })
    taskMakeCover({
      taskId,
      url,
      projectId
    }).then(res => {
      messageSuccess('updated cover')
    })
  }

  return (
    <div className="file-item">
      <Loading.Absolute title="Uploading ..." enabled={uploading} />
      <FileThumb {...{ name, src: url, ext, type: mimeType, id: id || '' }} />

      <div className="px-3 py-2">
        <h2
          className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2"
          title={data.name}>
          {data.name}
        </h2>
        <span className="text-gray-400 dark:text-gray-500 text-xs">
          {/* {generateSizeStr(data.size)} */}
        </span>
        <div className="space-x-2">
          <span className="text-gray-400 dark:text-gray-500 text-xs">
            Added {createdDate} at {createdTime}
          </span>
        </div>

        <div className="mt-1.5 space-x-1.5">
          {data.id ? (
            <FileDelete id={data.id} />
          ) : (
            <Button title="..." size="sm" />
          )}
          <a href={url} target="_blank" className="btn sm">
            Download
          </a>
          <Button
            title="Turn this into cover"
            size="sm"
            onClick={makeThisCover}
          />
        </div>
      </div>
    </div>
  )
}
