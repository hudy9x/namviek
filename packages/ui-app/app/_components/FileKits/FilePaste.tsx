import { messageSuccess } from '@shared/ui'
import { useEffect } from 'react'
import useFileUpload from './useFileUpload'

export default function FilePaste() {
  const { onFileHandler, testPasteFile } = useFileUpload()
  const onPaste = async (e: ClipboardEvent) => {
    e.preventDefault()
    const files = e.clipboardData?.files
    if (!files || !files.length) return

    messageSuccess('You pasted an image !')
    onFileHandler(files)
    testPasteFile()
  }

  useEffect(() => {
    document.addEventListener('paste', onPaste)
    return () => {
      document.removeEventListener('paste', onPaste)
    }
  }, [])
  return <></>
}
