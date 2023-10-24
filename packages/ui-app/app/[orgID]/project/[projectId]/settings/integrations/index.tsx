import { messageError } from '@shared/ui'
import React, { useRef } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function ProjectIntegrations() {
  const inputAddRef = useRef<HTMLInputElement>(null)

  return (
    <div className="setting-container">
      <div className="rounded-lg border dark:border-gray-700">
        <div className="relative flex items-center bg-gray-50 dark:bg-gray-800 rounded-b-lg">
          <AiOutlinePlus className="absolute top-3.5 left-4 text-gray-500" />
          <input
            ref={inputAddRef}
            className="bg-transparent w-full pl-12 text-gray-500 text-sm pr-8 py-3 outline-none"
            placeholder="Hit `Enter` to add a web hook"
            onKeyDown={e => {
              if (e.key !== 'Enter') {
                return
              }

              if (!inputAddRef) return messageError('Input is undefined')
              const target = inputAddRef.current

              if (!target || !target.value) {
                messageError('Web hook must not be empty')
                return
              }

              // handleAddNewPoint(parseInt(target.value, 10))
            }}
          />
        </div>
      </div>
    </div>
  )
}
