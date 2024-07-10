import { useGlobalDataStore } from "@/store/global"
import { useOrgIdBySlug } from "./useOrgIdBySlug"

export const useGetParams = () => {
  // const { orgId } = useOrgIdBySlug()
  const { orgId, orgName } = useGlobalDataStore()
  return { orgId, orgName }
}
