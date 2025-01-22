
import { useTaskAdd } from '@/components/DataFetcher/useTaskAdd'
import { useServiceTaskAdd } from '@/hooks/useServiceTaskAdd'
import { useUser } from '@auth-client'
import { Task } from '@prisma/client'
import { useParams } from 'next/navigation'

export default function CreateNewRow() {
  const { addNewRow } = useTaskAdd()
  const { user } = useUser()

  const onAdd = () => {
    addNewRow()
    // const userId = user?.id;
    // const value = 'Untitled'
    //
    // const data: Partial<Task> = {
    //   dueDate: new Date(),
    //   title: value,
    //   projectId
    // }
    //
    // if (userId) {
    //   data.assigneeIds = [userId]
    // }
    //
    // taskCreateOne(data)
  }

  return <div onClick={onAdd} className="cursor-pointer w-full bg-white dark:bg-gray-900 border-b text-gray-500 hover:text-gray-800 dark:hover:text-gray-400 px-3 py-2">
    <span className='uppercase text-[10px] font-medium'>Add row</span>
  </div>
}
