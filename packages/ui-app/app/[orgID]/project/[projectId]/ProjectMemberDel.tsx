import { useParams } from 'next/navigation'
import { memDeleteFromProject } from '../../../../services/member'
import { HiX } from 'react-icons/hi'
import { useMemberStore } from '../../../../store/member'
import { confirmAlert, messageError } from '@shared/ui'

export default function ProjectMemberDel({ uid }: { uid: string }) {
  const { projectId } = useParams()
  const { delMember } = useMemberStore()
  const onDelete = () => {
    confirmAlert({
      message: `Are you sure to want to remove this user from project ? Remember this action does not delete user. It only makes user have no access to the project`,
      yes: () => {
        delMember(uid)
        memDeleteFromProject(projectId, uid)
          .then(res => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
            messageError('Delete member error')
          })
      }
    })
  }

  return (
    <HiX
      onClick={onDelete}
      className="w-7 h-7 p-1.5 cursor-pointer rounded-md border text-gray-500 hover:text-red-400"
    />
  )
}
