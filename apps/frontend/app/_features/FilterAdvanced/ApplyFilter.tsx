import { Button } from "@ui-components"
import { useFilterAdvancedStore } from "./store"
import { useFilterAdvanced } from "./useFilterAdvancedStore"
import { HiOutlineCheck } from "react-icons/hi2"

export default function ApplyFilter() {
  const updateFilter = useFilterAdvancedStore(state => state.initializeFilter)
  const { filter } = useFilterAdvanced()

  const onUpdate = () => {
    console.log('apply filter', filter)
    updateFilter(filter)
  }
  return <Button leadingIcon={<HiOutlineCheck />} title="Apply filter" size="sm" ghost onClick={onUpdate} />
}
