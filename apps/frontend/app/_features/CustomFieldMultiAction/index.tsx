import { Button, messageSuccess } from "@ui-components";
import { useCheckboxStore } from "../CustomFieldCheckbox/useCheckboxStore";
import MultiActionInpDisplay from "./MultiActionInpDisplay";
import { useState } from "react";
import { FieldType } from "@prisma/client";
import { projectGridSv } from "@/services/project.grid";
import { useDataFetcher } from "@/components/DataFetcher/useDataFetcher";
// Define type for field values
type FieldValues = {
  [fieldId: string]: { value: string, type: FieldType }
}

export default function CustomFieldMultiAction() {
  const { updateCustomFields } = useDataFetcher()
  const clear = useCheckboxStore(state => state.clear)
  const [fieldValues, setFieldValues] = useState<FieldValues>({})
  const { display, length, ids } = useCheckboxStore(state => {
    let display = false
    let len = 0
    const ids: string[] = []
    for (const key in state.ids) {
      if (key in state.ids) {
        const element = state.ids[key];
        ids.push(...Array.from(element.values()))
        len += element.size
        if (len) {
          display = true
        }
      }
    }

    return {
      ids,
      display,
      length: len
    }
  })

  const handleFieldChange = (value: string | string[], fieldId: string, type: FieldType) => {
    const newValue = Array.isArray(value) ? value.toString() : value
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: { value: newValue, type }
    }))
  }

  const handleUpdate = () => {
    // Here you can access fieldValues and selected ids to perform the update
    console.log('Updating with values:', fieldValues, ids)

    updateCustomFields(ids, fieldValues)
    setFieldValues({})
    clear()

    projectGridSv.updateMany(ids, fieldValues).then(res => {
      console.log('respomd', res)
      messageSuccess('Multiple update successfully')
    })
    // Add your update logic here
  }

  if (!display) return null

  return <div style={{ height: 'calc(100vh - 78px)', top: 78 }} className="fixed right-0 h-full w-[300px] z-40 bg-white dark:bg-gray-900 dark:border-gray-700 border-t border-l shadow-md">
    <div className="space-y-2 py-3">
      <div className="border-b dark:border-gray-700 pb-3">
        <h2 className="mx-3 rounded-md bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 px-2 py-1.5 text-sm">Total: {length}</h2>
      </div>
      <MultiActionInpDisplay onFieldChange={handleFieldChange} />
      <div className="border-t dark:border-gray-700 pt-3 flex items-center gap-2 px-3">
        <Button title="Update" primary block onClick={handleUpdate} />
        <Button title="Cancel" onClick={() => clear()} block />
      </div>
    </div>
  </div>
}
