import { Button, messageError } from "@shared/ui"
import { useCustomFieldStore } from "./store"
import { fieldSv } from "@/services/field"
import { useParams } from "next/navigation"
import { useProjectCustomFieldStore } from "@/store/customFields"

export default function SubmitCustomFieldConfig() {
  const { data } = useCustomFieldStore()
  const addCustomField = useProjectCustomFieldStore(state => state.addCustomField)
  const updateCustomField = useProjectCustomFieldStore(state => state.updateCustomField)

  const { projectId } = useParams()

  const onSubmit = async () => {
    if (!projectId) {
      messageError('Project id is not found !')
      return
    }

    console.log('data', data)
    if (data.id) {
      console.log('edit mode ======')
      const result = await fieldSv.update({ ...data, ...{ projectId } })
      const { data: fieldData } = result.data
      console.log('this is result', fieldData)
      updateCustomField(fieldData)
      return
    }


    const result = await fieldSv.create({ ...data, ...{ projectId } })

    const { data: fieldData } = result.data

    console.log('this is result', fieldData)
    addCustomField(fieldData)

  }

  return <div className="mt-3">
    <Button block onClick={onSubmit} primary title="Create" />
  </div>
}
