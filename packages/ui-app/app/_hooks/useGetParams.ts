import { useGlobalDataStore } from "@/store/global"
import { useOrgIdBySlug } from "./useOrgIdBySlug"

export const useGetParams = () => {
  // const { orgId } = useOrgIdBySlug()
  const { orgId } = useGlobalDataStore()
  return { orgId }
}
