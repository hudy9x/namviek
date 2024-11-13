import { Form, randomId } from "@shared/ui";
import { useState } from "react";
import { useCheckboxStore } from "./useCheckboxStore";

export default function CustomFieldCheckboxItem({ taskId, groupId = 'ALL' }: { taskId: string, groupId?: string }) {

  const toggleCheckbox = useCheckboxStore(state => state.toogleCheckbox)
  const ids = useCheckboxStore(state => {
    const groupIdSet = state.ids[groupId]
    if (!groupIdSet) return new Set([])

    return groupIdSet
  })
  const [checked, setChecked] = useState(false)
  const id = randomId()


  console.log('ids set', ids)



  return <label htmlFor={id} className="list-cell cursor-pointer px-3 py-1">
    <Form.Checkbox
      size="lg"
      uid={id}
      checked={ids.has(taskId)} onChange={(val) => {
        toggleCheckbox(val, taskId, groupId)
      }} />

  </label>
}
