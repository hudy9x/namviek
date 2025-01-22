import { Button, messageError } from "@ui-components"
import { useCustomFieldStore } from "./store"
import { fieldSv } from "@/services/field"
import { useParams } from "next/navigation"
import { useProjectCustomFieldStore } from "@/store/customFields"
import { Field } from "@prisma/client"

export default function SubmitCustomFieldConfig() {
  const data = useCustomFieldStore(state => state.data)
  const setVisible = useCustomFieldStore(state => state.setVisible)
  const addCustomField = useProjectCustomFieldStore(state => state.addCustomField)

  const updateCustomField = useProjectCustomFieldStore(state => state.updateCustomField)

  const { projectId } = useParams()

  const updateCustomFieldHandler = async () => {
    const updateData = { ...data, ...{ projectId } }
    console.log('udpate field data', updateData)
    updateCustomField(updateData as Field)
    setVisible(false)
    const result = await fieldSv.update(updateData)
    const { data: fieldData } = result.data
    console.log('this is result', fieldData)
  }

  const createCustomFieldHandler = async () => {
    const insertData = { ...data, ...{ projectId } }
    console.log('insertData', insertData)
    const result = await fieldSv.create(insertData)
    const { data: fieldData } = result.data

    console.log('this is result', fieldData)
    addCustomField(fieldData)
    setVisible(false)

  }

  const onSubmit = async () => {
    if (!projectId) {
      messageError('Project id is not found !')
      return
    }

    console.log('data', data)
    if (data.id) {
      updateCustomFieldHandler()
      return
    }

    createCustomFieldHandler()
  }

  const title = data.id ? 'Update' : 'Create'

  return <div className="mt-3">
    <Button block onClick={onSubmit} primary title={title} />
  </div>
}
