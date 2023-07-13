import { useParams } from 'next/navigation'
import { TaskPoint } from '@prisma/client'
import { AiOutlineStar } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'

import { IoIosClose } from 'react-icons/io'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useProjectPointStore } from 'packages/ui-app/store/point'
import {
  projectPointCreate,
  projectPointDelete,
  projectPointUpdate
} from 'packages/ui-app/services/point'
import { messageError } from '@shared/ui'

interface ITaskPointInput {
  initPoint: TaskPoint
  handleSumit: (data: TaskPoint) => void
  handleDelete: (id: string) => void
}

const PointInput = ({
  initPoint,
  handleSumit,
  handleDelete
}: ITaskPointInput) => {
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
    <div className="relative flex items-center group">
      <AiOutlineStar className="absolute left-2 text-gray-500 top-3.5" />
      <input
        className="bg-transparent w-full pl-8 text-gray-500 text-sm pr-8 py-3 border-b outline-none"
        defaultValue={`${initPoint.point}`}
        onKeyDown={e => onSubmitKeyPressed(e)}
      />
      <div className="absolute right-2 gap-2 hidden group-hover:flex ">
        <FiEdit2
          className="cursor-pointer w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-md p-1 text-gray-500"
          onClick={() => console.log('edit point')}
        />
        <IoIosClose
          className="cursor-pointer w-5 h-5 bg-gray-100 hover:bg-red-100 hover:text-red-400 rounded-md text-gray-500"
          onClick={() => handleDelete(initPoint.id)}
        />
      </div>
      <p className="absolute right-0 translate-x-full invisible peer-invalid:visible text-red-600">
        Invalid input!
      </p>
    </div>
  )
}

export default function ProjectPoint() {
  const [taskPointList, setTaskPointList] = useState<TaskPoint[]>([])
  const inputAddRef = useRef<HTMLInputElement>(null)
  const { points, addPoint, updatePoint, deletePoint } = useProjectPointStore()
  const { projectId } = useParams()

  useEffect(() => {
    // const cloned = JSON.parse(JSON.stringify(points)) as TaskPoint[]
    const cloned = [...points]
    setTaskPointList(cloned.sort((a, b) => a.point - b.point))
  }, [points])

  useEffect(() => {
    const onKeyDownHandler = function (e: KeyboardEvent) {
      const target = e?.target as HTMLInputElement
      if (e.key === 'Enter' && target?.nodeName === 'INPUT') {
        try {
          const form = target?.form
          if (form) {
            const formElementsArray = Array.from(form)
            const currentIndex = formElementsArray.indexOf(target)
            const focusIndex =
              currentIndex === formElementsArray.length - 1
                ? currentIndex
                : currentIndex + 1
            ;(form.elements[focusIndex] as HTMLInputElement).focus()
            ;(form.elements[focusIndex] as HTMLInputElement).select()
            e.preventDefault()
          }
        } catch (e) {
          console.log('Input enter event got e: ', e)
        }
      }
    }
    document.addEventListener('keydown', onKeyDownHandler)
    return () => document.removeEventListener('keydown', onKeyDownHandler)
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
    async (v: number) => {
      const point: TaskPoint = {
        point: v,
        icon: null,
        projectId,
        id: `taskPoint-${Date.now()}`
      }
      addPoint(point)
      const { id: _, ...pointCreate } = point
      projectPointCreate(pointCreate)
        .then(response => updatePoint(point, response.data.data))
        .catch(err => console.error(`Create point error: ${err}`))

      if (inputAddRef.current?.value) inputAddRef.current.value = ''
    },
    [projectId, addPoint, updatePoint]
  )

  return (
    <div className="setting-container">
      <div className="rounded-lg border">
        <form>
          {taskPointList.map((point, i) => (
            <PointInput
              key={i}
              initPoint={point}
              handleSumit={(newPoint: TaskPoint) =>
                handleUpdatePoint(point, newPoint)
              }
              handleDelete={handleDeletePoint}
            />
          ))}
          <div className="relative flex items-center">
            <input
              ref={inputAddRef}
              className="bg-transparent w-full pl-8 text-gray-500 text-sm pr-8 py-3 outline-none"
              placeholder="Insert new task point here..."
              onKeyDown={e => {
                if (e.key !== 'Enter') {
                  return
                }

                if (!inputAddRef) return messageError('Input is undefined')
                const target = inputAddRef.current

                if (!target || !target.value) {
                  messageError('Point must not be empty')
                  return
                }

                if (!/^[0-9]+$/.test(target.value)) {
                  messageError('Point must be a integer')
                  return
                }

                handleAddNewPoint(parseInt(target.value, 10))
              }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
