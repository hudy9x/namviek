import { useRef } from 'react'
import { useFileKitContext } from './context'
import { Loading, randomId } from '@shared/ui'
import FileDesc from './FileDesc'
import FileListWrapper from './FileListWrapper'
import useFileUpload from './useFileUpload'


export default function FileControl() {
  const { loading, previewFiles } = useFileKitContext()
  const { onFileHandler } = useFileUpload()
  const idRef = useRef(randomId())

  const fileLen = previewFiles.length
  const hasAttachments = !!fileLen
  const onInputChange = (files: FileList) => {
    onFileHandler(files)
  }

  return (
    <div className="form-control relative">
      <Loading.Absolute enabled={loading} border />
      <label>Attachments {hasAttachments ? `(${fileLen} files)` : null}</label>
      <div>
        <FileListWrapper />
        {!hasAttachments ? <FileDesc inputId={idRef.current} /> : null}
        <input
          id={idRef.current}
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
  )
}
