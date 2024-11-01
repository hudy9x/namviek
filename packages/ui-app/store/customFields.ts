import { create } from 'zustand'
import { Field } from '@prisma/client'
import { produce } from 'immer'


interface FieldState {
  customFields: Field[]
  addCustomField: (field: Field) => void
  updateCustomField: (field: Field) => void
  removeCustomField: (id: string) => void
  addAllCustomField: (fields: Field[]) => void
}

export const useProjectCustomFieldStore = create<FieldState>(set => ({
  customFields: [],

  removeCustomField: (id: string) => set(produce((state: FieldState) => {

    state.customFields = state.customFields.filter(f => f.id !== id)
  })),

  addCustomField: (field: Field) => set(produce((state: FieldState) => {

    state.customFields = [...state.customFields, field]

  })),

  updateCustomField: (field: Field) => set(produce((state: FieldState) => {

    state.customFields = state.customFields.map(cf => {
      if (cf.id === field.id) {
        return { ...cf, ...field }
      }
      return cf
    })

  })),

  addAllCustomField: (fields: Field[]) => set(produce((state: FieldState) => {
    console.log('add custom fields', fields)

    state.customFields = fields

  }))
}))
