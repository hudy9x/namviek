import ProjectMemberView from "@/features/ProjectMember/View"
import FilterAdvanced from "@/features/FilterAdvanced"
import { useGetGridCollection } from "./useGetGridCollection"
import { HiOutlineTableCells } from "react-icons/hi2"
import GridWebhooks from "@/features/GridWebhooks"


export default function GridHeader() {
    const { gridCollection, loading } = useGetGridCollection()

    return <div className="grid-view-header flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
    <div className="grid-view-header-left">
      <div className="grid-view-header-left-title flex items-center gap-3">
        <div className="flex items-center gap-2">
        <HiOutlineTableCells className="w-4 h-4" />
        <span className="text-gray-500 font-medium text-sm">
          {loading ? 'Loading...' : gridCollection?.title}
        </span>
  
        </div>
        <FilterAdvanced />
        <GridWebhooks />
      </div>
    </div>
    <div className="grid-view-header-right">
      <ProjectMemberView />
    </div>
  </div>
  
}