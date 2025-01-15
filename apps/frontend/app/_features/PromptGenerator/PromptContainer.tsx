import { useState } from 'react'
import PromptContent from './PromptContent'

export default function PromptContainer() {
  const [selected, setSelected] = useState(-1)
  const promptTemplates = [
    { id: 'TASK_ALLOCATION', title: 'Task allocation' },
    { id: 'TASK_EVALUATION', title: 'Task evaluation' }
  ]

  return (
    <div>
      <div className="flex items-center gap-4">
        {promptTemplates.map((template, idx) => {
          const { id, title } = template
          return (
            <div
              className={`box cursor-pointer ${
                selected === idx ? 'text-indigo-500' : ''
              }`}
              onClick={() => {
                setSelected(selected === idx ? -1 : idx)
              }}
              key={id}>
              {title}
            </div>
          )
        })}
      </div>

      <div className="rounded-md bg-indigo-50/50 border p-8 mt-4 relative">
        <PromptContent
          type={promptTemplates[selected] ? promptTemplates[selected].id : ''}
        />
      </div>
    </div>
  )
}
