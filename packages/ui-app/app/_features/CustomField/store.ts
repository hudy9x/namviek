import { create } from 'zustand'
import { produce } from 'immer'
import { Field, FieldType, Prisma } from '@prisma/client'

type CustomState = {
  data: Partial<Field>
  setData: (data: Partial<Field>) => void
  setType: (type: FieldType) => void
  visible: boolean
  setVisible: (stt: boolean) => void
  display: boolean
  setDisplay: (stt: boolean) => void
  setConfig: (config: Prisma.JsonObject) => void
}

export const useCustomFieldStore = create<CustomState>(set => ({
  visible: false,
  setVisible: (stt: boolean) => set(produce((state: CustomState) => {
    state.visible = stt
  })),

  data: {},
  setType: (type: FieldType) => set(produce((state: CustomState) => {
    state.display = true
    state.data.type = type
    state.data.name = type.slice(0, 1) + type.slice(1, type.length).toLowerCase()
  })),

  setData: (data: Partial<Field>) => set(produce((state: CustomState) => {
    const oldData = state.data
    state.data = { ...oldData, ...data }
  })),

  setConfig: (config: Prisma.JsonObject) => set(produce((state: CustomState) => {
    const data = state.data
    const oldConfig = (data.config || {}) as Prisma.JsonObject

    state.data.config = {
      ...oldConfig,
      ...config
    }


  })),

  display: false,
  setDisplay: (stt: boolean) =>
    set(
      produce((state: CustomState) => {
        state.display = stt
        if (stt === false) {
          state.data = {}
        }
      })
    )
}))
