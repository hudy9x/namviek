import { Form } from "@shared/ui";

export default function ProjectViewForMe() {
  return <div className="flex items-center gap-2 mb-3">
    <Form.Checkbox
      checked={false}
      onChange={val => {
        console.log(val)
      }}
    />
    <span className="text-sm text-gray-500">
      Only me can see this view
    </span>
  </div>
}
