import { messageSuccess } from '@shared/ui'
import { useEffect } from 'react'
import useFileUpload from './useFileUpload'
import { useFileKitContext } from './context'

export default function FilePaste() {
  const { onFileHandler } = useFileUpload()
  const { taskId } = useFileKitContext()

  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      e.preventDefault()
      const files = e.clipboardData?.files
      if (!files || !files.length) return

      messageSuccess('You pasted an image !')
      onFileHandler(files)
    }
    document.addEventListener('paste', onPaste)
    return () => {
      document.removeEventListener('paste', onPaste)
    }
  }, [taskId, onFileHandler])
  return <></>
}
