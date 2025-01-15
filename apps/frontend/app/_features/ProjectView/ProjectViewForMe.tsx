import { Form } from "@shared/ui";
import { useProjectViewContext } from "./context";

export default function ProjectViewForMe() {
  const { onlyMe, setOnlyMe } = useProjectViewContext()

  return <div className="flex items-center gap-2 mb-3">
    <Form.Checkbox
      checked={onlyMe}
      onChange={stt => {
        setOnlyMe(stt)
      }}
    />
    <span className="text-sm text-gray-500">
      Only me can see this view
    </span>
  </div>
}
