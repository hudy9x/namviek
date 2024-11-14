import { Button } from "@shared/ui";
import { useCheckboxStore } from "../CustomFieldCheckbox/useCheckboxStore";
import MultiActionInpDisplay from "./MultiActionInpDisplay";

export default function CustomFieldMultiAction() {
  const clear = useCheckboxStore(state => state.clear)
  const { display, length } = useCheckboxStore(state => {
    let display = false
    let len = 0
    for (const key in state.ids) {
      if (state.ids.hasOwnProperty(key)) {
        const element = state.ids[key];
        len += element.size
        if (len) {
          display = true
        }
      }
    }

    return {
      display,
      length: len
    }
  })

  if (!display) return null

  return <div className="fixed top-0 right-0 h-full w-[300px] border-t z-40 bg-white border-l shadow-md">
    <div className="space-y-2 py-3">
      <div className="border-b pb-3">
        <h2 className="mx-3 rounded-md bg-gray-50 border px-2 py-1.5 text-sm">Total: {length}</h2>
      </div>
      <MultiActionInpDisplay />
      <div className="border-t pt-3 flex items-center gap-2 px-3">
        <Button title="Update" primary block />
        <Button title="Cancel" onClick={() => clear()} block />
      </div>
    </div>
  </div>
}
