import { AiOutlineCheck } from 'react-icons/ai'
import { useTaskImport } from './context'
import { Loading } from '@shared/ui'

export default function TaskImportStep() {
  const { step } = useTaskImport()
  if (step === 0) {
    return null
  }

  const steps = [
    'Normalizing data',
    'Importing data to project',
    'Waiting for the import process complete',
    'Trying to fill data into task list'
  ]

  return (
    <div className="absolute w-full h-full flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm">
      <div>
        {steps.map((s, id) => {
          const itemStep = id + 1
          const done = step > itemStep
          const running = step === itemStep
          return (
            <div
              key={id}
              className="flex items-center gap-3 text-lg text-gray-500">
              {done ? (
                <AiOutlineCheck className="w-4 h-4 text-green-500" />
              ) : null}

              {running ? (
                <div className="w-4 h-4">
                  <Loading />
                </div>
              ) : null}
              {!running && !done ? (
                <div className="w-4 h-4 rounded-full bg-gray-50 border"></div>
              ) : null}
              <span>{s}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
