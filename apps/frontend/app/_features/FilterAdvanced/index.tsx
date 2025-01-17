import { Popover } from "@ui-components";
import FilterButton from "./FilterButton";
import FilterAutoApply from "./FilterAutoApply";
import './style.css'
import { FilterAdvancedProvider } from "./FilterAdvancedProvider";
import FilterAdvancedModal from "./FilterAdvancedModal";
import SaveFilter from "./SaveFilter";
import ApplyFilter from "./ApplyFilter";

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
          <FilterAdvancedModal>
            <SaveFilter />
            <ApplyFilter />
          </FilterAdvancedModal>
        }
      // content={<FilterAdvancedModal />}
      />
      <FilterAutoApply />
    </FilterAdvancedProvider>
  </>
}
