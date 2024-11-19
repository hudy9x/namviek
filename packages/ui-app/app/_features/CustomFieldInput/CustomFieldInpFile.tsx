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

  const fileIds = value.split(',').filter(Boolean)
  const [display, setDisplay] = useState(false)
  const { onChange } = useCustomFieldInputContext()
  const handleUpdate = (uploadedFileIds: string[]) => {
    onChange(uploadedFileIds.concat(fileIds).join(','))
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
    className="absolute text-gray-600 top-1.5 hidden group-hover:block right-2 w-6 h-6 p-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" />

}

function CustomFieldFileUploadZone({ hide }: { hide: () => void }) {

  return createPortal(<div className="fixed top-0 left-0 w-full h-full z-[60] flex items-center justify-center">
    <div className="relative z-10 bg-white dark:bg-gray-900 rounded-md border dark:border-gray-700 shadow-sm">
      {/* <FilePaste /> */}
      <FileDrop className="w-[500px] h-[500px]">
        <div className="p-3">
          <h2 className="pb-3">Upload zone</h2>
          <FileControl />
        </div>
      </FileDrop>
    </div>
    <div className="absolute top-0 left-0 w-full h-full" onClick={hide}></div>
  </div>, document.body)
}

function CustomFieldFilePreview() {
  const { previewFiles, setSelected } = useFileKitContext()
  const onClickPreview = (id: string) => {
    const idx = previewFiles.findIndex(pf => pf.id === id)
    if (idx !== -1) {
      setSelected(idx)
      window.stopEscapeKeyCloseModal = true
    }
  }
  return <div className="cf-file-preview flex items-center gap-2">
    {previewFiles.map((file, findex) => {
      const fileIsImage = isImage(file.mimeType)
      const src = fileIsImage ? file.url : getIconUrl(file.ext)
      return <img
        onClick={() => file.id && onClickPreview(file.id)}
        className="max-h-[27px] max-w-[50px] cursor-pointer hover:opacity-80" key={findex} src={src} />
    })}
  </div>

}
