import { MemberRole } from '@prisma/client'
import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
const List = Form.List

const options: ListItemValue[] = [
  { id: MemberRole.MANAGER, title: MemberRole.MANAGER },
  { id: MemberRole.LEADER, title: MemberRole.LEADER },
  { id: MemberRole.MEMBER, title: MemberRole.MEMBER },
  { id: MemberRole.GUEST, title: MemberRole.GUEST }
]

export default function ProjectMemberPermission({
  uid,
  role
}: {
  uid: string
  role: MemberRole
}) {
  const [value, setValue] = useState<ListItemValue>({ id: role, title: role })

  return (
    <div className="project-member-permission">
      <List value={value} onChange={(val) => {
        setValue(val)

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
