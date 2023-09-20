import { useServiceAutomation } from '@/hooks/useServiceAutomation'
import { useAutomationStore } from '@/store/automation'
import { Button, confirmWarning } from '@shared/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'

export default function AutomateList() {
  const { orgID, projectId } = useParams()
  const { automations } = useAutomationStore()
  const { delAutomation } = useServiceAutomation()

  const onDelete = (id: string) => {
    confirmWarning({
      message:
        'This action will be delete permantly. Are you sure you want to do this action ?',
      yes: () => {
        delAutomation(id)
      }
    })
  }

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
          const { when, then } = automate
          const isUpdating = automate.id.includes('AUTOMATE_RAND_ID')
            ? 'animate-pulse'
            : ''
          return (
            <div className={`box ${isUpdating}`} key={automate.id}>
              {automate.id}
              <p>
                When {when.is} to {when.valueTo} happens on {when.happens}{' '}
                {'=>'} then do {then.change} to {then.value || 'any'}
              </p>
              <HiOutlineTrash
                onClick={() => {
                  if (isUpdating) return
                  onDelete(automate.id)
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
