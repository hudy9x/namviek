import { Button } from '@shared/ui'
import { useContext } from 'react'
import { LuGitBranchPlus } from 'react-icons/lu'
import { SubTaskContext } from '../SubTask/context'

export default function SubTaskAction() {
  const { toggleOpen, loading } = useContext(SubTaskContext)
  return <Button onClick={toggleOpen} loading={loading} leadingIcon={<LuGitBranchPlus />} />
}
