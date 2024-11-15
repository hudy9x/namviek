import { Popover } from "@shared/ui";
import FilterButton from "./FilterButton";
import FilterAutoApply from "./FilterAutoApply";
import './style.css'
import { FilterAdvancedProvider } from "./FilterAdvancedProvider";
import FilterAdvancedModal from "./FilterAdvancedModal";

export default function FilterAdvanced() {
  return <>
    <FilterAdvancedProvider>
      <Popover
        align="start"
        sideOffset={4}
        triggerBy={
          <div>
            <FilterButton />
          </div>
        }
        content={
          <FilterAdvancedModal />
        }
      // content={<FilterAdvancedModal />}
      />
      <FilterAutoApply />
    </FilterAdvancedProvider>
  </>
}
