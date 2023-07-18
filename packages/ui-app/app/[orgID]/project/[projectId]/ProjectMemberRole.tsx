import { MemberRole } from '@prisma/client'
import { Form, ListItemValue, messageError } from '@shared/ui'
import { useParams } from 'next/navigation'
import { memUpdateRole } from '../../../../services/member'
import { useMemberStore } from '../../../../store/member'
import { useEffect, useState } from 'react'
const List = Form.List

const options: ListItemValue[] = [
  { id: MemberRole.MANAGER, title: MemberRole.MANAGER },
  { id: MemberRole.LEADER, title: MemberRole.LEADER },
  { id: MemberRole.MEMBER, title: MemberRole.MEMBER },
  { id: MemberRole.GUEST, title: MemberRole.GUEST }
]

export default function ProjectMemberRole({
  uid,
  role
}: {
  uid: string
  role: MemberRole
}) {
  const { projectId } = useParams()
  const [value, setValue] = useState<ListItemValue>({ id: role, title: role })
  const { updateMemberRole } = useMemberStore()

  const onUpdate = (val: ListItemValue) => {
    console.log('update', val.id)
    const newRole = val.id as MemberRole
    updateMemberRole(uid, newRole)
    memUpdateRole(uid, projectId, newRole)
      .then(res => {
        const { status, data } = res.data

        if (status !== 200) {
          messageError('Update role failure !')
          return
        }

        console.log('update role successfully', data)
      })
      .catch(error => {
        messageError('Update role failed!')
        console.log(error)
      })
  }

  useEffect(() => {
    setValue({ id: role, title: role })
  }, [role])

  return (
    <div className="project-member-permission">
      <List
        value={value}
        onChange={val => {
          onUpdate(val as ListItemValue)
        }}>
        <List.Button>{value.title}</List.Button>
        <List.Options>
          {options.map(option => {
            return (
              <List.Item key={option.id} value={option}>
                {option.title}
              </List.Item>
            )
          })}
        </List.Options>
      </List>
    </div>
  )
}
