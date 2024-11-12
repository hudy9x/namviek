import { Popover } from "@shared/ui";
import FilterAdvancedModal from "./FilterAdvancedModal";
import FilterButton from "./FilterButton";
import FilterAutoApply from "./FilterAutoApply";
import './style.css'

export default function FilterAdvanced() {
  return <><Popover
    align="start"
    sideOffset={4}
    triggerBy={
      <div>
        <FilterButton />
      </div>
    }
    content={<FilterAdvancedModal />}
  />
    <FilterAutoApply />
  </>
}
