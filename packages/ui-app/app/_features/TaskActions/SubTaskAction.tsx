import { Button } from '@shared/ui'
import { useContext } from 'react'
import { LuGitBranchPlus } from 'react-icons/lu'
import { TaskContext } from '../../[orgID]/project/[projectId]/views/ListMode'

export default function SubTaskAction() {
  const { toggleOpen } = useContext(TaskContext)
  return <Button onClick={toggleOpen} leadingIcon={<LuGitBranchPlus />} />
}