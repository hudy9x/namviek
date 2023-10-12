import FileList from './FileList'
import { useFileKitContext } from './context'

export default function FileListWrapper() {
  const { previewFiles } = useFileKitContext()

  console.log('previewFiles', previewFiles)

  if (!previewFiles.length) return null

  return <FileList files={previewFiles} />
}
