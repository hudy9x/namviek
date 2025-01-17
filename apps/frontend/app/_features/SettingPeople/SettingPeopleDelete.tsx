import { useServiceOrgMember } from '@/hooks/useServiceOrgMember'
import {
  Button,
  confirmAlert,
  messageSuccess
} from '@ui-components'
import { HiOutlineTrash } from 'react-icons/hi2'
import { useUserRole } from '../UserPermission/useUserRole'

export default function SettingPeopleDelete({ id, email, className }: { id: string, email: string, className?: string }) {

  const { orgRole } = useUserRole()
  const { removeMemberFromOrg } = useServiceOrgMember()

  if (orgRole !== 'ADMIN') return null

  return <Button
    size="sm"
    className={className}
    leadingIcon={<HiOutlineTrash />}
    onClick={() => {
      confirmAlert({
        title: `Are you sure you want to do this action ?`,
        message: `This action will remove ${email} from the organization and all projects in which he/she is currently participating`,
        yes: () => {
          removeMemberFromOrg(id).then(res => {
            messageSuccess(`Removed ${email}`)
          })
        }
      })
    }}
  />
}
