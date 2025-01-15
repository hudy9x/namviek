import { create } from 'zustand'
import { Field } from '@prisma/client'
import { produce } from 'immer'


interface FieldState {
  customFields: Field[]
  addCustomField: (field: Field) => void
  updateCustomField: (field: Field) => void
  updateFieldWidth: (index: number, width: number) => void
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

  updateFieldWidth: (index: number, width: number) => set(produce((state: FieldState) => {
    const fieldData = state.customFields[index]

    if (!fieldData) {
      return
    }

    state.customFields[index] = {
      ...fieldData,
      ...{
        width
      }
    }
  })),

  updateCustomField: (field: Field) => set(produce((state: FieldState) => {

    const newCustomFields = state.customFields.map(cf => {
      if (cf.id === field.id) {
        field.desc = new Date().toString()
        return { ...cf, ...field }
      }
      return cf
    })

    state.customFields = newCustomFields

  })),

  addAllCustomField: (fields: Field[]) => set(produce((state: FieldState) => {
    state.customFields = fields

  })),

}))
