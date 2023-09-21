import { Button } from '@shared/ui'
import { useAutomateContext } from './context'
import { useParams, useRouter } from 'next/navigation'
import { useServiceAutomation } from '@/hooks/useServiceAutomation'
import { AutomateThenPart, AutomateWhenPart } from './AutomateDesc'

export default function AutomateCreate() {
  const { push } = useRouter()
  const { orgID, projectId } = useParams()
  const { when, then } = useAutomateContext()
  const { addAutomation } = useServiceAutomation()

  const onCreate = () => {
    addAutomation({ when, then, projectId, organizationId: orgID })
    push(`/${orgID}/project/${projectId}?mode=automation`)
  }

  return (
    <div className="mt-8 text-gray-500 space-y-5 text-center flex flex-col items-center">
      <div className="box text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 bg-white">
        <AutomateWhenPart when={when} /> <AutomateThenPart then={then} />
      </div>
      <Button onClick={onCreate} primary title="Create automation" />
    </div>
  )
}
