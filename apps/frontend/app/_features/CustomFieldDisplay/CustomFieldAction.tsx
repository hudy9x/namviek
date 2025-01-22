import { DropdownMenu, confirmAlert, messageSuccess } from '@ui-components'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useCustomFieldStore } from '../CustomField/store'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import { PiPencilSimple } from 'react-icons/pi'
import { Field } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useProjectCustomFieldStore } from '@/store/customFields'
import { fieldSv } from '@/services/field'
import localforage from 'localforage'

function useDeleteCustomField(id: string) {
  const { projectId } = useParams()
  const removeField = useProjectCustomFieldStore(state => state.removeCustomField)

  const deleteHandler = () => {
    fieldSv.delete(id).then(res => {
      messageSuccess('Deleted')
    })
    removeField(id)
    const key = `PROJECT_CUSTOM_FIELD_${projectId}`
    localforage.removeItem(key)
  }

  const deleteCustomField = () => {
    confirmAlert({
      message: 'Are you sure you want to delete this field ?',
      yes: () => {
        deleteHandler()
      }
    })
  }

  return { deleteCustomField }
}

export default function CustomFieldAction({ data }: { data: Field }) {
  const setEditCustomField = useCustomFieldStore(state => state.setEditData)
  const { deleteCustomField } = useDeleteCustomField(data.id)
  return <DropdownMenu>
    <DropdownMenu.Trigger
      size="sm"
    >
      <IoMdArrowDropdown className='cursor-pointer w-6 text-gray-400' />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item
        onClick={() => {
          setEditCustomField(data)
        }}
        icon={<PiPencilSimple />}
        title={'Edit'}
      />
      <DropdownMenu.Item
        onClick={deleteCustomField}
        icon={<HiOutlineTrash className='text-red-500' />}
        title={'Delete'}
      />
    </DropdownMenu.Content>
  </DropdownMenu>
}
