import CustomFieldDisplay from "@/features/CustomFieldDisplay"
import CustomFieldInputFactory from "@/features/CustomFieldInput/CustomFieldInputFactory"
import CustomFieldInputProvider from "@/features/CustomFieldInput/CustomFieldInputProvider"
import { taskCustomFieldSv } from "@/services/task.customfield"
import { useProjectCustomFieldStore } from "@/store/customFields"
import { ExtendedTask } from "@/store/task"
import { FieldType, Prisma } from "@prisma/client"
import { messageSuccess } from "@shared/ui"

const useOnChangeCustomFieldInput = (taskId: string) => {

  const onChange = (value: string | string[], fieldId: string, type: FieldType) => {
    console.log(value)
    taskCustomFieldSv.update({
      taskId,
      type,
      value,
      fieldId
    }).then(res => {
      const { data, status } = res.data
      console.log('returned data:', data, status)
      if (status !== 200) return
      messageSuccess('Update field value sucecss')
    })
  }

  return {
    onChange
  }
}

export default function ListContentRow({ task }: { task: ExtendedTask }) {

  const taskCustomData = task.customFields
  const customData = (taskCustomData || {}) as Prisma.JsonObject
  // const customFields = useProjectCustomFieldStore(state => state.customFields)
  const { onChange } = useOnChangeCustomFieldInput(task.id)

  return <div className="list-row"
    key={task.id}>

    <CustomFieldDisplay>
      {(index, fieldData) => {
        const { id, type } = fieldData
        const data = JSON.stringify(fieldData.data)
        const config = JSON.stringify(fieldData.config)
        const dataValue = customData[id] // convert all to string
        return <>
          <CustomFieldInputProvider onChange={(value) => {
            console.log(id, value)
            onChange(value, id, type)
          }} >
            <CustomFieldInputFactory
              data={data}
              config={config}
              type={type}
              value={dataValue ? (dataValue + '') : ''} />
          </CustomFieldInputProvider>
        </>
      }}
    </CustomFieldDisplay>



    {/* {customFields.map(cf => { */}
    {/*   const configData = cf.config as Prisma.JsonObject */}
    {/*   const width = (configData.width || 100) as number */}
    {/**/}
    {/*   const fieldId = cf.id */}
    {/**/}
    {/*   if (!cf) { */}
    {/*     return <div key={fieldId} className="list-cell" style={{ width }}></div> */}
    {/*   } */}
    {/**/}
    {/*   const dataValue = customData[cf.id] // convert all to string */}
    {/*   const type = cf.type */}
    {/*   const data = JSON.stringify(cf.data) */}
    {/*   const config = JSON.stringify(cf.config) */}
    {/**/}
    {/*   return <div key={cf.id} */}
    {/*     className="list-cell" */}
    {/*     style={{ width: width }}> */}
    {/**/}
    {/*     <CustomFieldInputProvider onChange={(value) => { */}
    {/*       onChange(value, cf.id, cf.type) */}
    {/*     }} > */}
    {/*       <CustomFieldInputFactory */}
    {/*         data={data} */}
    {/*         config={config} */}
    {/*         type={type} */}
    {/*         value={dataValue ? (dataValue + '') : ''} /> */}
    {/*     </CustomFieldInputProvider> */}
    {/*   </div> */}
    {/* })} */}
    {/* <div className="list-cell"></div> */}
  </div>
}
