import FileKitContainer from '@/components/FileKits'
import { storageGetFilesByCreator } from '@/services/storage'
import { FileStorage } from '@prisma/client'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

interface IWhiteBoardContext {
  files: FileStorage[]
  setFiles: (files: FileStorage[]) => void
  selectedFile: FileStorage | null
  setSelectedFile: (file: FileStorage) => void
}
const WhiteBoardContext = createContext<IWhiteBoardContext>({
  files: [],
  setFiles: () => {
    console.log(1)
  },
  selectedFile: null,
  setSelectedFile: () => {
    console.log(1)
  }
})

const WhiteBoardProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<FileStorage[]>([])
  const [selectedFile, setSelectedFile] = useState<FileStorage | null>(null)
  

  useEffect(() => {
    storageGetFilesByCreator()
      .then(result => {
        const fileData = result.data.data as FileStorage[]
        console.log({ fileData })
        setFiles(fileData)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="h-full">
      {' '}
      <WhiteBoardContext.Provider
        value={{ files, setFiles, selectedFile, setSelectedFile }}>
        <FileKitContainer fileIds={files.map(f => f.id)}>
          {children}
        </FileKitContainer>
        {/* {children} */}
      </WhiteBoardContext.Provider>
    </div>
  )
}

const useWhiteBoardContext = () => {
  return useContext(WhiteBoardContext)
}

export { useWhiteBoardContext, WhiteBoardProvider }
