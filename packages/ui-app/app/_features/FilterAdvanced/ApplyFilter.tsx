import { Button } from "@shared/ui"
import { useFilterAdvancedStore } from "./store"
import { useFilterAdvanced } from "./useFilterAdvancedStore"

export default function ApplyFilter() {
  const updateFilter = useFilterAdvancedStore(state => state.initializeFilter)
  const { filter } = useFilterAdvanced()

  const onUpdate = () => {
    console.log('apply filter', filter)
    updateFilter(filter)
  }
  return <Button title="Apply filter" ghost onClick={onUpdate} />
}
