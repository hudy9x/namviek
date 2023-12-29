import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface IProjectViewContextProps {
  name: string
  setName: Dispatch<SetStateAction<string>>
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}
const ProjectViewContext = createContext<IProjectViewContextProps>({
  name: '',
  setName: () => {
    console.log(1)
  },
  visible: false,
  setVisible: () => {
    console.log(1)
  }
})

export const ProjectViewProvider = ProjectViewContext.Provider

export const useProjectViewContext = () => {
  return useContext(ProjectViewContext)
}
