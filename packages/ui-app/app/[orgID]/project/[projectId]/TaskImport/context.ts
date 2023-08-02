import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { Row } from 'read-excel-file'

interface ITaskImport {
  step: number
  rows: Row[]
  setRows: Dispatch<SetStateAction<Row[]>>
  setVisible: Dispatch<SetStateAction<boolean>>
  setStep: Dispatch<SetStateAction<number>>
}

const ImportContext = createContext<ITaskImport>({
  rows: [],
  step: 0,
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
