import { Popover } from "@shared/ui";
import { HiOutlineFilter } from "react-icons/hi";
import FilterAdvancedModal from "./FilterAdvancedModal";

export default function FilterAdvanced() {
  return <Popover
    align="start"
    sideOffset={4}
    triggerBy={
      <div className="my-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 py-1 px-1.5 text-sm flex items-center gap-2 rounded-md">
        <HiOutlineFilter />
        <span>Filter</span>
      </div>
    }
    content={<FilterAdvancedModal />}
  />

}
