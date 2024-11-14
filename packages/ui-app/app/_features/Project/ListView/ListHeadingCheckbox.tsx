import CustomFieldCheckboxAll from "@/features/CustomFieldCheckbox/CustomFieldCheckboxAll";
import { useTaskStore } from "@/store/task";

export default function ListHeadingCheckbox() {

  const taskIds = useTaskStore(state => state.tasks.map(t => t.id))

  return <CustomFieldCheckboxAll taskIds={taskIds} />
}
