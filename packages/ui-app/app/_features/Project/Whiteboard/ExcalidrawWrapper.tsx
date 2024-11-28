'use client'
import useFileUpload from '@/components/FileKits/useFileUpload'
import {
  Excalidraw,
  convertToExcalidrawElements,
  exportToClipboard,
  useHandleLibrary,
  MIME_TYPES,
  sceneCoordsToViewportCoords,
  viewportCoordsToSceneCoords,
  restoreElements,
  LiveCollaborationTrigger,
  serializeAsJSON,
  MainMenu
} from '@excalidraw/excalidraw'
import { Button, randomId } from '@shared/ui'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { useState } from 'react'
import { FileStorage } from '@prisma/client'
import { useWhiteBoardContext } from './context'
import FilesOpenModal from './FilesOpenModal'
import { useEffect } from 'react'
import { IoCloudDownloadOutline } from 'react-icons/io5'
import { IoCloudUploadOutline } from "react-icons/io5";


// import "@excalidraw/excalidraw/index.css";

const prepareFile = async (file: File) => {
  const randId = randomId()
  return {
    randId: randId,
    data: file
  }
}

const ExcalidrawWrapper: React.FC = () => {
  const { uploadFileToS3 } = useFileUpload()
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null)
  const [showFilesModal, setShowFilesModal] = useState(false)

  const { files, setFiles, selectedFile } = useWhiteBoardContext()

  useEffect(() => {
    setShowFilesModal(false)
  }, [selectedFile])

  const uploadFile = async (file: File) => {
    const preparedFile = await prepareFile(file)
    return uploadFileToS3([preparedFile])
  }

  const onSave = async (filename?: string) => {
    if (!excalidrawAPI) {
      return false
    }
    const jsonData = serializeAsJSON(
      excalidrawAPI.getSceneElements(),
      excalidrawAPI.getAppState(),
      excalidrawAPI.getFiles(),
      'local'
    )
    console.log({ jsonData })
    const blob = new Blob([jsonData], { type: 'application/json' })

    // Create a File from the Blob
    const file = new File([blob], `${filename || Date.now()}.excalidraw`, {
      type: 'application/json'
    })

    const fileItems = await uploadFile(file)
    if (!fileItems.length) {
      return
    }
    const fileItem = fileItems[0]
    console.log({ fileItem, files })
    setFiles([...files, fileItem] as FileStorage[])
  }
  // <MainMenu.DefaultItems.LiveCollaborationTrigger
  //   isCollaborating={isCollaborating}
  //   onSelect={() => window.alert("You clicked on collab button")}
  // />
  const renderMenu = () => {
    return (
      <MainMenu>
        <MainMenu.DefaultItems.SaveAsImage />
        <MainMenu.DefaultItems.Export />
        <MainMenu.Separator />
        <MainMenu.Group title="Excalidraw links">
          <MainMenu.DefaultItems.Socials />
        </MainMenu.Group>
        <MainMenu.Separator />
        <MainMenu.ItemCustom>
          <span className="flex items-center gap-3 cursor-pointer" onClick={setShowFilesModal.bind(null,true)}>
            <IoCloudDownloadOutline />
            <p>Open from storage</p>
          </span>
        </MainMenu.ItemCustom>
        <MainMenu.ItemCustom>
          <span className="flex items-center gap-3 cursor-pointer" onClick={onSave.bind(null, 'json')}>
            <IoCloudUploadOutline />
            <p>Save to storage</p>
          </span>
        </MainMenu.ItemCustom>
        <MainMenu.DefaultItems.Help />
      </MainMenu>
    )
  }
  return (
    <div className="w-full h-full">
      <Excalidraw
        excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}>
        {renderMenu()}
      </Excalidraw>
      <FilesOpenModal
        visible={showFilesModal}
        setVisible={() => setShowFilesModal(false)}
        // onSubmit={() => {}}
      />
    </div>
  )
}
export default ExcalidrawWrapper
