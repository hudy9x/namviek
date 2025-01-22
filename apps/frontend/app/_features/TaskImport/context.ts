import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { Row } from 'read-excel-file'

interface ITaskImport {
  step: number
  rows: Row[]
  heading: string[]
  originRows: Row[]
  setOriginRows: Dispatch<SetStateAction<Row[]>>
  setHeading: Dispatch<SetStateAction<string[]>>
  setRows: Dispatch<SetStateAction<Row[]>>
  setVisible: Dispatch<SetStateAction<boolean>>
  setStep: Dispatch<SetStateAction<number>>
}

const ImportContext = createContext<ITaskImport>({
  rows: [],
  step: 0,
  heading: [],
  originRows: [],
  setOriginRows: () => {
    console.log(1)
  },
  setHeading: () => {
    console.log(1)
  },
  setRows: () => {
    console.log('1')
  },
  setVisible: () => {
    console.log('2')
  },
  setStep: () => {
    console.log('2')
  }
})
export const TaskImportProvider = ImportContext.Provider

export const useTaskImport = () => {
  const context = useContext(ImportContext)

  return context
}
