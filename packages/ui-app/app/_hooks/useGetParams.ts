import { useOrgIdBySlug } from "./useOrgIdBySlug"

export const useGetParams = () => {
  const { orgId } = useOrgIdBySlug()
  return { orgId }
}
