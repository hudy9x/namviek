import { getProjectMember } from "@/services/member"
import { UserMember } from "@/store/member"
import { useMemberStore } from "@/store/member"
import localforage from "localforage"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export const useGetMembers = () => {
  const { projectId } = useParams()
  const { addAllMember } = useMemberStore()
  const key = `PROJECT_MEMBER_${projectId}`

  useEffect(() => {
    localforage.getItem(key).then(val => {
      if (val) {
        console.log('set cached member as projectId changed')
        addAllMember(val as UserMember[])
      }
    })
  }, [projectId])

  useEffect(() => {
    const memberController = new AbortController()
    getProjectMember(projectId, memberController.signal)
      .then(res => {
        const { data, status } = res.data
        if (status !== 200) {
          addAllMember([])
          return
        }

        localforage.setItem(key, data)
        setTimeout(() => {
          addAllMember(data)
        }, 300)

      })
      .catch(err => {
        console.log(err)
      })

    return () => {
      memberController.abort()
    }
  }, [projectId])
}
