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
    <div className="box w-[900px] mx-auto">
      <h2 className="flex items-center justify-between text-xl font-bold">
        <span>Rules</span>
        <Link href={`/${orgID}/project/${projectId}/?mode=automation-create`}>
          <Button title="Create" leadingIcon={<HiOutlinePlus />} primary />
        </Link>
      </h2>
      <p className="text-sm text-gray-500">
        Rules are simple: when one thing happens, another thing happens
        automatically
      </p>
      <div className="mt-5 space-y-3">
        {!automations.length ? (
          <div className="box-2 text-sm">No rules found !</div>
        ) : null}
        {automations.map(automate => {
          return <AutomateDesc {...automate} key={automate.id} />
        })}
      </div>
    </div>
  )
}
