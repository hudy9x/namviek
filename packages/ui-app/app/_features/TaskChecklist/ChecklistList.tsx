import { Form, Loading, messageSuccess } from '@shared/ui'
import { useChecklistStore } from './store'
import { HiOutlineX } from 'react-icons/hi'
import { taskChecklistSv } from '@/services/task.checklist'
import useGetTaskChecklist from './useGetTaskChecklist'
import ChecklistInput from './ChecklistInput'
import useChecklistCounter from './useChecklitCounter'
import { TaskChecklist } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

export default function ChecklistList({
  taskId,
  parentTaskId,
  subTaskCheckList,
  setListSubTaskCheckList
}: {
  taskId: string
  parentTaskId?: string | null
  subTaskCheckList: TaskChecklist[]
  setListSubTaskCheckList: Dispatch<SetStateAction<TaskChecklist[]>>
}) {
  console.log()
  const { checklists, loading, toggleChecklistStatus, deleteChecklist } = useChecklistStore()
  const taskChecklists = parentTaskId ? subTaskCheckList : checklists[taskId] || []
  useGetTaskChecklist(taskId, parentTaskId, setListSubTaskCheckList)
  useChecklistCounter(taskId)

  const onDelete = (id: string) => {
    deleteChecklist(taskId, id)
    setListSubTaskCheckList(prev => prev.filter(item => item.id !== id))
    taskChecklistSv.delete(id).then(res => {
      messageSuccess('Delete success')
    })
  }

  const onCheck = (checked: boolean, idx: number, id: string) => {
    toggleChecklistStatus(taskId, idx)

    if (parentTaskId) {
      setListSubTaskCheckList(prev =>
        prev.map(item => {
          if (item.id === id) {
            return { ...item, done: checked }
          }
          return item
        })
      )
    }

    taskChecklistSv
      .update({
        done: checked,
        id
      })
      .then(res => {
        console.log(res)
        messageSuccess('Change done status ok !')
      })
  }


  return <>
    {taskChecklists.length ? null :
      <Loading size="base" enabled={loading} title="Loading ..." />
    }

    {taskChecklists.map((c, idx) => {
      const { id, title, done } = c
      return <div key={id} className="checklist-item">
        <Form.Checkbox checked={done || false} onChange={checked => {
          onCheck(checked, idx, id)
        }} className="shrink-0" />
        <ChecklistInput id={id} value={title} taskId={taskId} />
        {/* {id} */}
        <HiOutlineX onClick={() => {
          onDelete(id)
        }} className="cursor-pointer" />
      </div>
    })}
  </>

}
