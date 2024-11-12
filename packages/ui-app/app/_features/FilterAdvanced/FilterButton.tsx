import { HiOutlineFilter } from "react-icons/hi";
import { useFilterAdvancedStore } from "./store";

export default function FilterButton() {
  const filter = useFilterAdvancedStore(state => state.filter)
  const len = filter.list.length
  return <div className={`my-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 ${len ? 'bg-gray-100 dark:bg-gray-800' : ''} py-1 px-1.5 text-sm flex items-center gap-2 rounded-md`}>
    <HiOutlineFilter />
    <span>Filter</span>
    {len ? <small>{len}</small> : null}
  </div>
}
