import { Button } from '@shared/ui'
import { useAutomateContext } from './context'
import { useParams, useRouter } from 'next/navigation'
import { useServiceAutomation } from '@/hooks/useServiceAutomation'

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
    <div className="mt-8 text-gray-500 space-y-3 text-center">
      <p>
        when {when.is} happens on {when.happens} {'=>'} then do {then.change} to{' '}
        {then.value || 'any'}
      </p>
      <Button onClick={onCreate} primary title="Create automation" />
    </div>
  )
}
