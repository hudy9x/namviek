import { create } from 'zustand'
import { produce } from 'immer'
// import { projectViewMap } from './useProjectViewList'

interface IProjectViewUpdateProps {
  updateId: string
  setUpdateId: (id: string) => void
}

export const useProjectViewUpdateStore = create<IProjectViewUpdateProps>(set => ({
  updateId: '',
  setUpdateId: (id: string) =>
    set(
      produce((draftState: IProjectViewUpdateProps) => {
        draftState.updateId = id
      })
    )
}))
//
// export const useProjectViewUpdateContext = () => {
//   const context = useProjectViewUpdateStore()
//
//   const isUpdate = !!context.updateId
//   const type = projectViewMap.get(context.updateId)
//
//   return { ...context, isUpdate, type }
// }
