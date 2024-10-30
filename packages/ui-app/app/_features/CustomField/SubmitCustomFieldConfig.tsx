import { Button, messageError } from "@shared/ui"
import { useCustomFieldStore } from "./store"
import { fieldSv } from "@/services/field"
import { useParams } from "next/navigation"
import { useProjectCustomFieldStore } from "@/store/customFields"

export default function SubmitCustomFieldConfig() {
  const { data } = useCustomFieldStore()
  const addCustomField = useProjectCustomFieldStore(state => state.addCustomField)
  const { projectId } = useParams()

  const onSubmit = async () => {
    if (!projectId) {
      messageError('Project id is not found !')
      return
    }

    console.log('data', data)

    const result = await fieldSv.create({ ...data, ...{ projectId } })

    const { data: fieldData } = result.data

    console.log('this is result', fieldData)
    addCustomField(fieldData)

  }

  return <div className="mt-3">
    <Button block onClick={onSubmit} primary title="Create" />
  </div>
}
