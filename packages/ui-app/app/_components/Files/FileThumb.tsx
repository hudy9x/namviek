import { useEffect } from 'react'

const isImage = (mimeType: string) => {
  return mimeType.startsWith('image/')
}

export default function FileThumb({
  extension,
  url,
  type,
  name
}: {
  extension: string
  url: string
  type: string
  name: string
}) {
  if (isImage(type)) {
    return (
      <div className="bg-gray-100 border-r rounded-l-md max-h-[150px] w-[200px]">
        <img alt={name} className="h-auto w-auto rounded-l-md" src={url} />
      </div>
    )
  }

  return (
    <div className="bg-gray-100 px-3 py-2 border-b rounded-t-md h-[100px] flex items-center justify-center">
      <span className="uppercase text-xs border rounded-md bg-white px-2 py-1">
        .{extension}
      </span>
    </div>
  )
}
