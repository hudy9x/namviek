import { useEffect } from 'react'

const isImage = (mimeType: string) => {
  return mimeType.startsWith('image/')
}

export default function FileThumb({
  extension,
  data,
  type
}: {
  extension: string
  data: File
  type: string
}) {
  if (isImage(type)) {
    return (
      <div className="bg-gray-100 border-b rounded-t-md h-[100px]">
        <img
          className="h-full rounded-t-md"
          src={window.URL.createObjectURL(data)}
        />
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
