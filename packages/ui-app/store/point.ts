import { create } from 'zustand'
import { TaskPoint } from '@prisma/client'
import { produce } from 'immer'

interface IProjectPointState {
  points: TaskPoint[]
  addAllPoints: (data: TaskPoint[]) => void
  updatePoint: (oldPoint: TaskPoint, newPoint: TaskPoint) => void
  addPoint: (data: TaskPoint) => void
  deletePoint: (id: string) => void
}

export const useProjectPointStore = create<IProjectPointState>(set => ({
  points: [],
  addAllPoints: (data: TaskPoint[]) =>
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
