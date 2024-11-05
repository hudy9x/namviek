import { Popover } from "@shared/ui";
import { HiOutlineFilter } from "react-icons/hi";
import FilterAdvancedModal from "./FilterAdvancedModal";

export default function FilterAdvanced() {
  return <Popover
    triggerBy={
      <div className="my-1 py-1 px-1.5 text-sm flex items-center gap-2 bg-gray-100 rounded-md">
        <HiOutlineFilter />
        <span>Filter</span>
      </div>
    }
    content={<FilterAdvancedModal />}
  />

}
