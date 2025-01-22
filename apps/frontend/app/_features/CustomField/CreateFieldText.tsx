import { Form } from "@ui-components";
import { useCustomFieldStore } from "./store";

export default function CreateFieldText() {
  const { data, setData } = useCustomFieldStore()
  const { name, desc } = data

  return <div className="space-y-3">
    <Form.Input value={name} onChange={ev => {
      setData({ name: ev.target.value })
    }} title="Field name" placeholder="Input your field name" required className="w-full" />

    <Form.Textarea placeholder="What does this field do ?" value={desc || ''} onChange={ev => {
      setData({ desc: ev.target.value })
    }} title="Description" className="w-full" />
  </div>
}
