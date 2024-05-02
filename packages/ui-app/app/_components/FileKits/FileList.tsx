import { Button } from '@shared/ui'
import FileItem from './FileItem'
import { IFileItem } from './context'
import { useState } from 'react'
import useFileUpload from './useFileUpload'

export default function FileList({ files }: { files: IFileItem[] }) {
  const { onFileHandler } = useFileUpload()
  const [viewMore, setViewMore] = useState(false)
  const n = 3
  const sliced = files.slice(n)
  const onViewMore = () => {
    setViewMore(!viewMore)
  }
  const onInputChange = (files: FileList) => {
    onFileHandler(files)
  }


  return (
    <div className="space-y-2">
      <div className='space-y-2'>
        {files.slice(0, n).map((file, id) => {
          return <FileItem key={id} data={file} />
        })}

        {viewMore
          ? sliced.map(file => {
            return <FileItem key={file.id || file.randId} data={file} />
          })
          : null}
      </div>

      <div className='flex items-center gap-2'>

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
        <div>
          <label className='btn sm cursor-pointer' style={{ margin: 0 }} htmlFor='upload-more'>Add new file</label>
          <input
            id={'upload-more'}
            multiple
            className="hidden"
            type="file"
            onChange={ev => {
              const files = ev.target.files
              files && files.length && onInputChange(files)
            }}
          />
        </div>
      </div>
    </div>
  )
}
