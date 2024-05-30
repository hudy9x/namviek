import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface IProjectViewUpdateProps {
  updateId: string
  setUpdateId: Dispatch<SetStateAction<string>>
}

const ProjectViewUpdateContext = createContext<IProjectViewUpdateProps>({
  updateId: '',
  setUpdateId: () => console.log(1)
})

export const ProjectViewUpdateProvider = ProjectViewUpdateContext.Provider

export const useProjectViewUpdateContext = () => {
  const context = useContext(ProjectViewUpdateContext)

  const isUpdate = !!context.updateId

  return { ...context, isUpdate }
}
