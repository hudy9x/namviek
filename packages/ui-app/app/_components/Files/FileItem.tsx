import FileThumb from './FileThumb'
import { IFileItem } from './FileUpload'

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
  return (
    <div className="border  bg-white rounded-md text-sm">
      <FileThumb extension={data.ext} data={data.data} type={data.mimeType} />

      <div className="px-3 py-1">
        <h2 className="text-gray-600 text-xs">{data.name}</h2>
        <span className="text-gray-400 text-xs">
          {generateSizeStr(data.size)}
        </span>
      </div>
    </div>
  )
}
