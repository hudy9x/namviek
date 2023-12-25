import FileList from './FileList'
import { useFileKitContext } from './context'

export default function FileListWrapper() {
  const { previewFiles } = useFileKitContext()

  if (!previewFiles.length) return null

  return <FileList files={previewFiles} />
}
