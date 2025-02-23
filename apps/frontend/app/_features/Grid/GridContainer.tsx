'use client'
import CustomFieldModal from "@/features/CustomField/CustomFieldModal"
import GridViewContainer from "@/features/Project/GridView/GridViewContainer"
import { useGetMembers } from "@/features/ProjectContainer/useGetMembers"
import { useGetGridFields } from "./useGetGridFields"
import { ConnectorCacheProvider } from '../CustomFieldInput/ConnectorCache'
import './style.css'
import GridHeader from "./GridHeader"

export default function GridContainer() {
  useGetGridFields()
  useGetMembers()


  return (
    <ConnectorCacheProvider>
      <div className="grid-view">
        <GridHeader />
        <GridViewContainer />
        <CustomFieldModal />
      </div>
    </ConnectorCacheProvider>
  )
}
