import { useAutomationStore } from '@/store/automation'
import { Button } from '@shared/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { HiOutlinePlus } from 'react-icons/hi2'
import AutomateDesc from './AutomateDesc'

export default function AutomateRuleList() {
  const { orgID, projectId } = useParams()
  const { automations } = useAutomationStore()

  return (
    <div className="w-[900px] mx-auto mt-10">
      <Link href={`/${orgID}/project/${projectId}/?mode=automation-create`}>
        <Button
          title="Create automation task"
          leadingIcon={<HiOutlinePlus />}
          primary
        />
      </Link>
      <div className="mt-5 space-y-3">
        {automations.map(automate => {
          return <AutomateDesc {...automate} key={automate.id} />
        })}
      </div>
    </div>
  )
}
