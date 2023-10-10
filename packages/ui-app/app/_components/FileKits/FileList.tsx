import { Button } from '@shared/ui'
import FileItem from './FileItem'
import { IFileItem } from './context'
import { useState } from 'react'

export default function FileList({ files }: { files: IFileItem[] }) {
  const [viewMore, setViewMore] = useState(false)
  const n = 3
  const sliced = files.slice(n)
  const onViewMore = () => {
    setViewMore(!viewMore)
  }
  return (
    <div className="space-y-2">
      {files.slice(0, n).map((file, id) => {
        return <FileItem key={id} data={file} />
      })}

      {viewMore
        ? sliced.map(file => {
            return <FileItem key={file.id || file.randId} data={file} />
          })
        : null}

      {sliced.length ? (
        <Button
          size="sm"
          onClick={onViewMore}
          title={
            viewMore
              ? `Hide ${sliced.length} file`
              : `View ${sliced.length} file more`
          }
        />
      ) : null}
    </div>
  )
}
