import { useUrl } from "@/hooks/useUrl"
import { useEffect } from "react"

export default function useChannelTeamCollab() {
  const { projectId } = useUrl()
  useEffect(() => {
    console.log('1')
  }, [])
  console.log(1)
}
