import { create } from 'zustand'
import { TaskPoint } from '@prisma/client'
import { produce } from 'immer'
import { I18NProvider } from 'next/dist/server/future/helpers/i18n-provider'

interface IProjectPointState {
  points: TaskPoint[]
  setAllPoints: (data: TaskPoint[]) => void
  updatePoint: (oldPoint: TaskPoint, newPoint: TaskPoint) => void
  addPoint: (data: TaskPoint) => void
  deletePoint: (id: string) => void
}

export const useProjectPointStore = create<IProjectPointState>(set => ({
  points: [],
  setAllPoints: (data: TaskPoint[]) =>
    set(
      produce((draftState: IProjectPointState) => {
        draftState.points = data
      })
    ),
  updatePoint: (oldPoint: TaskPoint, newPoint: TaskPoint) =>
    set(
      produce((draftState: IProjectPointState) => {
        draftState.points = [...draftState.points.filter(p => p.id !== oldPoint.id), newPoint]
      })
    ),
  addPoint: (data: TaskPoint) =>
    set(
      produce((draftState: IProjectPointState) => {
        draftState.points.push(data)
      })
    ),
  deletePoint: (id: string) =>
    set(
      produce((draftState: IProjectPointState) => {
        draftState.points = draftState.points.filter(point => point.id !== id)
      })
    )
}))
