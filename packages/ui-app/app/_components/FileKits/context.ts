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
  createdAt?: Date
}

export type IFileUploadItem = {
  randId: string
  data: File
}

interface IFileKitContextProps {
  uploading: boolean
  setUploading: Dispatch<SetStateAction<boolean>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  previewFiles: IFileItem[]
  selected: number
  setPreviewFiles: Dispatch<SetStateAction<IFileItem[]>>
  setSelected: Dispatch<SetStateAction<number>>
}

const FileKitContext = createContext<IFileKitContextProps>({
  loading: false,
  uploading: false,
  previewFiles: [],
  selected: -1,
  setUploading: () => {
    console.log(1)
  },
  setLoading: () => {
    console.log(1)
  },
  setSelected: () => {
    console.log(1)
  },
  setPreviewFiles: () => {
    console.log(1)
  }
})

export const FileKitProvider = FileKitContext.Provider

export const useFileKitContext = () => {
  const context = useContext(FileKitContext)
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
