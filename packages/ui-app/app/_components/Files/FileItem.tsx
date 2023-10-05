import { Button } from '@shared/ui'
import FileThumb from './FileThumb'
import { IFileItem } from './useFileUpload'
import AbsoluteLoading from '../AbsoluateLoading'

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
  const { name, url, ext, mimeType, uploading } = data
  return (
    <div className="file-item">
      <AbsoluteLoading title="Uploading ..." enabled={uploading} />
      <FileThumb {...{ name, src: url, ext, type: mimeType }} />

      <div className="px-3 py-1">
        <h2 className="text-gray-600 dark:text-gray-400 text-sm">
          {data.name}
        </h2>
        <span className="text-gray-400 dark:text-gray-500 text-xs">
          {generateSizeStr(data.size)}
        </span>
        <div className="mt-1.5">
          <Button title="Delete" size="sm" />
        </div>
      </div>
    </div>
  )
}
