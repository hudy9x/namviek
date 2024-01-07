import { useDebounce } from "@/hooks/useDebounce"
import { useMemberStore } from "@/store/member"
import { useProjectStore } from "@/store/project"
import { useUser } from "@goalie/nextjs"

export default function UserPermission() {
  const { projects } = useProjectStore()
  const { members } = useMemberStore()
  const { user } = useUser()


  console.log(members)

  useDebounce(() => {
    if (user && user.id && projects.length) {
      console.log(1)
    }

  }, [projects, user])

  return <></>
}
