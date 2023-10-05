import { useEffect } from 'react'

const isImage = (mimeType: string) => {
  return mimeType.startsWith('image/')
}

export default function FileThumb({
  name,
  src,
  ext,
  type
}: {
  name: string
  src: string
  ext: string
  type: string
}) {
  if (isImage(type)) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 border-r dark:border-gray-700 rounded-l-md max-h-[150px] w-[200px] shrink-0">
        <img alt={name} className="h-auto w-auto rounded-l-md" src={src} />
      </div>
    )
  }

  return (
    <div className="bg-gray-100 border-r dark:border-gray-700 rounded-l-md max-h-[150px] w-[200px] shrink-0">
      <span className="uppercase text-xs border rounded-md bg-white px-2 py-1">
        .{ext}
      </span>
    </div>
  )
}
