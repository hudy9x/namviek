import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { projectViewMap } from "./useProjectViewList";

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
  const type = projectViewMap.get(context.updateId)

  return { ...context, isUpdate, type }
}
