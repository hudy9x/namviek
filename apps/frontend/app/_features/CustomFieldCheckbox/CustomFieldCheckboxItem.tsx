import { Form, randomId } from "@ui-components";
import { useMemo, useState } from "react";
import { useCheckboxStore } from "./useCheckboxStore";

export default function CustomFieldCheckboxItem({ taskId, groupId = 'ALL' }: { taskId: string, groupId?: string }) {

  const toggleCheckbox = useCheckboxStore(state => state.toogleCheckbox)
  const ids = useCheckboxStore(state => {
    const groupIdSet = state.ids[groupId]
    if (!groupIdSet) return new Set([])

    return groupIdSet
  })
  const id = useMemo(() => randomId(), [])

  return <label htmlFor={id} className="list-cell cursor-pointer px-3 py-1.5">
    <Form.Checkbox
      size="lg"
      uid={id}
      checked={ids.has(taskId)} onChange={(val) => {
        toggleCheckbox(val, taskId, groupId)
      }} />

  </label>
}
