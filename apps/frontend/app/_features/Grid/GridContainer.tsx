'use client'
import ProjectMemberView from "@/features/ProjectMember/View"

import CustomFieldModal from "@/features/CustomField/CustomFieldModal"
import GridViewContainer from "@/features/Project/GridView/GridViewContainer"
import { useGetMembers } from "@/features/ProjectContainer/useGetMembers"
import FilterAdvanced from "@/features/FilterAdvanced"
import { useGetGridFields } from "./useGetGridFields"
import { useGetGridCollection } from "./useGetGridCollection"
import './style.css'
import { HiOutlineTableCells } from "react-icons/hi2"
export default function GridContainer() {
  useGetGridFields()
  useGetMembers()
  const { gridCollection, loading } = useGetGridCollection()

  return <div className="grid-view">
    <div className="grid-view-header flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="grid-view-header-left">
        <div className="grid-view-header-left-title flex items-center gap-2">
        <HiOutlineTableCells className="w-4 h-4" />
        <span className="text-gray-500 font-medium text-sm">{loading ? 'Loading...' : gridCollection?.title}</span>
          <FilterAdvanced />
        </div>
      </div>
      <div className="grid-view-header-right">
        <ProjectMemberView />
      </div>
    </div>
    <GridViewContainer />
    <CustomFieldModal />
  </div>
}
