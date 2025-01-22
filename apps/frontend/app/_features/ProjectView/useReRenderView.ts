import { create } from 'zustand'
import { produce } from 'immer'

interface IReRenderView {
  counter: number
  doReRender: () => void
}

export const useReRenderView = create<IReRenderView>(set => ({
  counter: 0,
  doReRender: () =>
    set(
      produce((draftState: IReRenderView) => {
        draftState.counter += 1;
      })
    ),
}))
