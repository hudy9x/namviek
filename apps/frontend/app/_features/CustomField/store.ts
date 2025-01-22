import { create } from 'zustand'
import { produce } from 'immer'
import { Field, FieldType, Prisma } from '@prisma/client'


export type TCustomFieldOption = {
  id: number,
  order: number,
  value: string,
  color: string
}

type CustomState = {
  data: Partial<Field>
  setData: (data: Partial<Field>) => void
  setEditData: (data: Field) => void
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

  setEditData: (data: Field) => set(produce((state: CustomState) => {
    state.visible = true
    state.data = data // override field's data
    state.display = true // move to edit field
  })),

  data: {},
  setType: (type: FieldType) => set(produce((state: CustomState) => {
    state.display = true
    state.data.type = type
    const name = type.slice(0, 1) + type.slice(1, type.length).toLowerCase()
    state.data.name = name.replace('_', ' ') // only for fields such as: updated_at, updated_by, created_at, created_by
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
        // const isCreating = !state.data.id
        state.display = stt

        // only clear data as creating new field
        if (stt === false) {
          state.data = {}
        }
      })
    )
}))
