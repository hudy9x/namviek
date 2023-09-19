import { Button, randomId } from '@shared/ui'
import { useAutomateContext } from './context'
import { useParams, useRouter } from 'next/navigation'
import { useAutomationStore } from '@/store/automation'

export default function AutomateCreate() {
  const { push } = useRouter()
  const { orgID, projectId } = useParams()
  const { when, then } = useAutomateContext()
  const { addNewAutomation } = useAutomationStore()
  const onCreate = () => {
    const id = 'AUTOMATE_RAND_ID_' + randomId()
    addNewAutomation({
      id,
      then,
      when,
      organizationId: orgID,
      projectId
    })
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
