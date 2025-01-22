import { getProjectMember } from '@/services/member'
import { UserMember } from '@/store/member'
import { useMemberStore } from '@/store/member'
import localforage from 'localforage'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export const useGetMembersHandler = (projectId: string) => {
  const { addAllMember } = useMemberStore()
  const key = `PROJECT_MEMBER_${projectId}`

  const fetchMemberNCache = () => {
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
    return { abortController: memberController }
  }

  return {
    fetch: fetchMemberNCache
  }
}

export const useGetMembers = () => {
  const { projectId } = useParams()
  const { addAllMember } = useMemberStore()
  const { fetch } = useGetMembersHandler(projectId)
  const key = `PROJECT_MEMBER_${projectId}`

  useEffect(() => {
    localforage.getItem(key).then(val => {
      if (val) {
        addAllMember(val as UserMember[])
      }
    })
  }, [projectId])

  useEffect(() => {
    const { abortController } = fetch()

    return () => {
      abortController.abort()
    }
  }, [])
}
