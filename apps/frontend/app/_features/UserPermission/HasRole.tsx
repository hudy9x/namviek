import { ReactNode } from 'react'
import { useUserRole } from './useUserRole'
import { MemberRole } from '@prisma/client'

interface IHasRole {
  children: ReactNode
  projectRoles: MemberRole | MemberRole[]
}

export default function HasRole({ children, projectRoles }: IHasRole) {
  const { projectRole } = useUserRole()

  if (projectRole && projectRoles.includes(projectRole)) {
    return <>{children}</>
  }

  return <></>
}
