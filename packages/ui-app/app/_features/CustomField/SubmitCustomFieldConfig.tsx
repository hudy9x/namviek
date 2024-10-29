import { Button, messageError } from "@shared/ui"
import { useCustomFieldStore } from "./store"
import { fieldSv } from "@/services/field"
import { useParams } from "next/navigation"

export default function SubmitCustomFieldConfig() {
  const { data } = useCustomFieldStore()
  const { projectId } = useParams()

  const onSubmit = async () => {
    if (!projectId) {
      messageError('Project id is not found !')
      return
    }

    console.log('data', data)

    // const result = await fieldSv.create({ ...data, ...{ projectId } })
    // console.log('this is result', result)
  }

  return <div className="mt-3">
    <Button block onClick={onSubmit} primary title="Create" />
  </div>
}
