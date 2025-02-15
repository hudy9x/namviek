
import { useGridRowAdd } from '@/components/DataFetcher/useGridRowAdd'
import { useUser } from '@auth-client'

export default function CreateNewRow() {
  const { addNewRow } = useGridRowAdd()
  const { user } = useUser()

  const onAdd = () => {
    addNewRow()
  }

  return <div onClick={onAdd} className="cursor-pointer w-full bg-white dark:bg-gray-900 border-b text-gray-500 hover:text-gray-800 dark:hover:text-gray-400 px-3 py-2">
    <span className='uppercase text-[10px] font-medium'>Add row</span>
  </div>
}
