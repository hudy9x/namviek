import { HiOutlineUpload } from "react-icons/hi"
import { useCustomFieldInputContext } from "./context"
import FileKitProviderContainer from "@/components/FileKits/FileKitProviderContainer"
import { createPortal } from "react-dom"
import { useCallback, useState } from "react"
import FileDrop from "@/components/FileKits/FileDrop"
import FilePaste from "@/components/FileKits/FilePaste"
import { getIconUrl, isImage, useFileKitContext } from "@/components/FileKits/context"
import FileControl from "@/components/FileKits/FileControl"

export default function CustomFieldInpFile({ rowId, value }: { rowId: string, value: string }) {

  const [fileIds, setFileIds] = useState(value.split(',').filter(Boolean))
  const [display, setDisplay] = useState(false)
  const { onChange } = useCustomFieldInputContext()
  const handleUpdate = (uploadedFileIds: string[]) => {
    const mergedFileIds = uploadedFileIds.concat(fileIds).join(',')

    onChange(mergedFileIds)
    setFileIds(fileIds)
  }

  const onHideHandler = useCallback(() => {
    setDisplay(false)
  }, [setDisplay])

  const onShowHandler = useCallback(() => {
    setDisplay(true)
  }, [setDisplay])

  return <FileKitProviderContainer
    onChange={handleUpdate}
    taskId={rowId}
    fileIds={fileIds} >
    <div className="cf-input-container">
      <div className="px-3 flex items-center h-full bg-transparent group">
        <CustomFieldFilePreview />
        <UploadButton show={onShowHandler} />
      </div>
    </div>
    {display ? <CustomFieldFileUploadZone hide={onHideHandler} /> : null}
  </FileKitProviderContainer>
}

function UploadButton({ show }: { show: () => void }) {
  return <HiOutlineUpload
    onClick={show}
    className="absolute text-gray-600 top-1.5 hidden group-hover:block right-2 w-6 h-6 p-1 rounded-md cursor-pointer border bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800" />

}

function CustomFieldFileUploadZone({ hide }: { hide: () => void }) {

  return createPortal(<div className="fixed top-0 left-0 w-full h-full z-[60] flex items-center justify-center">
    <div className="relative z-10 bg-white dark:bg-gray-900 rounded-md border border-gray-400 dark:border-gray-700">
      <FilePaste />
      <FileDrop className="cf-file-container w-[500px]">
        <div className="px-6 py-6">
          <div className="text-center pb-6">
            <h2 className="text-xl font-bold">Upload your files</h2>
            <p className="text-sm text-gray-500">Files should be .gif, .png, .jpg, .jpeg, ....</p>
          </div>
          <FileControl />
        </div>
      </FileDrop>
    </div>
    <div className="absolute top-0 left-0 bg-black/20 w-full h-full" onClick={hide}></div>
  </div>, document.body)
}

function CustomFieldFilePreview({ maxDisplayed = 3 }: { maxDisplayed?: number }) {
  const { previewFiles, setSelected } = useFileKitContext()

  const onClickPreview = (id: string) => {
    const idx = previewFiles.findIndex(pf => pf.id === id)
    if (idx !== -1) {
      setSelected(idx)
      window.stopEscapeKeyCloseModal = true
    }
  }

  const visibleFiles = previewFiles.slice(0, maxDisplayed)
  const remainingCount = previewFiles.length - maxDisplayed

  return <div className="cf-file-preview flex items-center gap-2">
    {visibleFiles.map((file, findex) => {
      const fileIsImage = isImage(file.mimeType)
      const src = fileIsImage ? file.url : getIconUrl(file.ext)
      return <img
        onClick={() => file.id && onClickPreview(file.id)}
        className="max-h-[27px] max-w-[50px] cursor-pointer hover:opacity-80"
        key={findex}
        src={src}
      />
    })}
    {remainingCount > 0 && (
      <button
        onClick={() => previewFiles[3]?.id && onClickPreview(previewFiles[3].id)}
        className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        +{remainingCount} more
      </button>
    )}
  </div>
}
