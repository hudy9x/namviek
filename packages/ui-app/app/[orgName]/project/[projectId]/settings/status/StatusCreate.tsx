import { useUserRole } from '@/features/UserPermission/useUserRole'
import { useStatus } from '@/hooks/status'
import { useRef, KeyboardEvent, useMemo } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function StatusCreate() {
  const inputAddRef = useRef<HTMLInputElement>(null)
  const { createNewStatus } = useStatus({})
  const { projectRole } = useUserRole()

  const onPressEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    createNewStatus(e, inputAddRef)
  }

  const placeholder = useMemo(() => {
    return !projectRole
      ? ''
      : projectRole === 'MANAGER' || projectRole === 'LEADER'
      ? 'Hit `Enter` to add a new status'
      : 'Only your boss can add new status'
  }, [projectRole])

  const readOnly = projectRole === 'MEMBER' || projectRole === 'GUEST'

  return (
    <div className="relative flex items-center bg-gray-50 dark:bg-gray-800 rounded-b-lg">
      <AiOutlinePlus className="absolute top-3.5 left-4 text-gray-500" />
      <input
        readOnly={readOnly}
        ref={inputAddRef}
        className="bg-transparent w-full pl-12 text-gray-500 text-sm pr-8 py-3 outline-none"
        placeholder={placeholder}
        onKeyDown={onPressEnter}
      />
    </div>
  )
}
