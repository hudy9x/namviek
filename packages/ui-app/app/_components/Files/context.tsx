import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export type IFileItem = {
  id?: string
  randId?: string
  uploading: boolean
  name: string
  size: number
  ext: string
  keyName?: string
  mimeType: string
  data?: File
  url: string
}

export type IFileUploadItem = {
  randId: string
  data: File
}

interface IFileStorageContextProps {
  previewFiles: IFileItem[]
  selected: number
  setPreviewFiles: Dispatch<SetStateAction<IFileItem[]>>
  setSelected: Dispatch<SetStateAction<number>>
}

const FileStorageContext = createContext<IFileStorageContextProps>({
  previewFiles: [],
  selected: -1,
  setSelected: () => {
    console.log(1)
  },
  setPreviewFiles: () => {
    console.log(1)
  }
})

export const FileStorageProvider = FileStorageContext.Provider

export const useFileStorageContext = () => {
  const context = useContext(FileStorageContext)
  return context
}

export const isImage = (mimeType: string) => {
  return mimeType.startsWith('image/')
}

export const iconNames = {
  xlsx: 'xlsx.png',
  xls: 'xlsx.png',
  doc: 'doc.png',
  docx: 'doc.png',
  pptx: 'ppt.png',
  ppt: 'ppt.png',
  zip: 'zip.png',
  rar: 'rar.png',
  js: 'js.png',
  ts: 'js.png',
  txt: 'txt.png',
  pdf: 'pdf.png',
  exe: 'exe.png',
  css: 'css.png',
  psd: 'psd.png',
  xml: 'xml.png',
  json: 'json.png',
  csv: 'csv.png',
  mp3: 'mp3.png'
}

export const getIconUrl = (ext: string) => {
  if (ext in iconNames)
    return `/filepacks/${iconNames[ext as keyof typeof iconNames]}`

  return `/filepacks/file.png`
}
