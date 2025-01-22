import { Form, randomId } from "@ui-components";
import { useCheckboxStore } from "./useCheckboxStore";
import { useMemo } from "react";

export default function CustomFieldCheckboxAll({
  taskIds,
  groupId = 'ALL'
}: { taskIds: string[], groupId?: string }) {
  const toggle = useCheckboxStore(state => state.toggleCheckboxAll)
  const checkedAlls = useCheckboxStore(state => state.checkAlls)
  const id = useMemo(() => randomId(), [])

  return <label htmlFor={id} className="list-cell">
    <Form.Checkbox size="lg" checked={checkedAlls.has(groupId)} uid={id} onChange={checked => {
      toggle(checked, taskIds, groupId)
    }} />
  </label>
}
