import { useParams, useRouter } from 'next/navigation'
import { TaskPoint } from '@prisma/client'
import { AiOutlineStar } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useProjectPointStore } from 'packages/ui-app/store/point'
import { projectPointCreate, projectPointDelete, projectPointUpdate } from 'packages/ui-app/services/point'

interface ITaskPointInput {
  initPoint: TaskPoint
  handleSumit: (data: TaskPoint) => void
  handleDelete: (id: string) => void
}

const PointInput = ({ initPoint, handleSumit, handleDelete }: ITaskPointInput) => {
  const onSubmitKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const target = e.target as HTMLInputElement
        handleSumit({ ...initPoint, point: parseInt(target.value) })
      } catch (e) {
        console.log(`input point submit pressed with error`)
      }
    }
    return
  }

  return (
    <div className="relative flex items-center">
      <AiOutlineStar className="absolute" />
      <input
        type="number"
        className="w-full peer invalid:border-red-600 invalid:border"
        defaultValue={`${initPoint.point}`}
        onKeyDown={e => onSubmitKeyPressed(e)}
      />
      <div className="absolute flex right-0 ">
        <CiEdit className="cursor-pointer" onClick={() => console.log('edit point')} />
        <RiDeleteBinLine className="cursor-pointer" onClick={() => handleDelete(initPoint.id)} />
      </div>
      <p className="absolute right-0 translate-x-full invisible peer-invalid:visible text-red-600">Invalid input!</p>
    </div>
  )
}
function isNumber(str) {
  if (str.trim() === '') {
    return false
  }

  return !isNaN(str)
}

export default function ProjectPoint() {
  const [taskPointList, setTaskPointList] = useState<TaskPoint[]>([])
  const inputAddRef = useRef<HTMLInputElement>(null)
  const { points, addPoint, updatePoint, deletePoint } = useProjectPointStore()
  const { projectId } = useParams()

  useEffect(() => {
    ;(async function () {
      setTaskPointList([...points])
    })()
  }, [points])

  useEffect(() => {
    document.addEventListener('keydown', function (e: KeyboardEvent) {
      const target = e?.target as HTMLInputElement
      if (e.key === 'Enter' && target?.nodeName === 'INPUT') {
        try {
          const form = target?.form
          if (form) {
            const formElementsArray = Array.from(form)
            const currentIndex = formElementsArray.indexOf(target)
            const focusIndex = currentIndex === formElementsArray.length - 1 ? currentIndex : currentIndex + 1
            ;(form.elements[focusIndex] as HTMLInputElement).focus()
            ;(form.elements[focusIndex] as HTMLInputElement).select()
            e.preventDefault()
          }
        } catch (e) {
          console.log('Input enter event got e: ', e)
        }
      }
    })
  }, [])

  const handleDeletePoint = (id: string) => {
    deletePoint(id)
    projectPointDelete(id)
  }

  const handleUpdatePoint = (oldData: TaskPoint, newData: TaskPoint) => {
    if (oldData.point === newData.point) return
    updatePoint(oldData, newData)
    projectPointUpdate(newData).catch(err => {
      console.log(`Update point failed: ${err}\nRollback to old value`)
      updatePoint(newData, oldData)
    })
  }

  const handleAddNewPoint = useCallback(
    async (v: number | undefined) => {
      if (v) {
        const point: TaskPoint = { point: v, icon: null, projectId, id: `taskPoint-${Date.now()}` }
        addPoint(point)
        const { id: _, ...pointCreate } = point
        projectPointCreate(pointCreate)
          .then(response => updatePoint(point, response.data.data))
          .catch(err => console.log(`Create point error: ${err}`))

        if (inputAddRef.current?.value) inputAddRef.current.value = ''
      }
    },
    [projectId, addPoint, updatePoint]
  )

  return (
    <div>
      <h2>Project Status</h2>
      <p>
        Story points are used to measured the ...
        <br />
        For instance: <b>1, 2, 3, 5, ... 100</b>{' '}
      </p>
      <div className="rounded-lg border">
        <form>
          {taskPointList.map((point, i) => (
            <PointInput
              key={i}
              initPoint={point}
              handleSumit={(newPoint: TaskPoint) => handleUpdatePoint(point, newPoint)}
              handleDelete={handleDeletePoint}
            />
          ))}
          <div className="relative flex items-center">
            <input
              ref={inputAddRef}
              type="number"
              className="peer invalid:border-red-600 invalid:border"
              placeholder="Insert new task point here..."
              onKeyDown={e => {
                if (e.key === 'Enter' && inputAddRef?.current !== null && isNumber(inputAddRef.current?.value)) {
                  handleAddNewPoint(parseInt(inputAddRef.current.value))
                }
              }}
            />
            <p className="invisible peer-invalid:visible text-red-600">Invalid input!</p>
          </div>
        </form>
      </div>
    </div>
  )
}
