import { useDataFetcher } from "@/components/DataFetcher/useDataFetcher";
import CustomFieldCheckboxAll from "@/features/CustomFieldCheckbox/CustomFieldCheckboxAll";

export default function GridHeadingCheckbox() {

  const taskIds = useDataFetcher(state => state.data.map(d => d.id))

  return <CustomFieldCheckboxAll taskIds={taskIds} />
}
