'use client'

import CustomFieldModal from "../CustomField/CustomFieldModal"
import GridViewContainer from "../Project/GridView/GridViewContainer"
import { useGetMembers } from "../ProjectContainer/useGetMembers"
import { useGetGridFields } from "./useGetGridFields"

export default function GridContainer() {
  useGetGridFields()
  useGetMembers()

  return <div className="grid-view">
    <GridViewContainer />
    <CustomFieldModal />
  </div>
}
