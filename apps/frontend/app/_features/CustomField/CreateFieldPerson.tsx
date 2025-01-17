import { Form } from "@ui-components"
import { useCustomFieldStore } from "./store"
import MultiMemberPicker from "../../_components/MultiMemberPicker"
import { ChangeEvent, useEffect } from "react"
import { Prisma } from "@prisma/client"

export default function CreateFieldPerson() {
  const { data, setData } = useCustomFieldStore()
  const { name, desc } = data
  const config = data.config as Prisma.JsonObject
  const isMultiple = config?.multiple ? true : false
  const isShowAllMember = config?.allMembers === undefined ? true : !!config.allMembers
  const selectedMembers = (config?.selectedMembers || []) as string[]

  useEffect(() => {
    if (config?.allMembers === undefined) {
      setData({
        ...data,
        config: {
          ...config,
          allMembers: true,
          selectedMembers: []
        }
      })
    }
  }, [])

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setData({ name: ev.target.value })
  }

  // const handleDescChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
  //   setData({ desc: ev.target.value })
  // }

  const handleMultipleChange = (checked: boolean) => {
    setData({
      ...data,
      config: {
        ...config,
        multiple: checked
      }
    })
  }

  const handleAllMembersChange = (checked: boolean) => {
    setData({
      ...data,
      config: {
        ...config,
        allMembers: checked,
        selectedMembers: checked ? [] : (config?.selectedMembers || [])
      }
    })
  }

  const handleSelectedMembersChange = (selectedMembers: string[]) => {
    setData({
      ...data,
      config: {
        ...config,
        selectedMembers
      }
    })
  }

  return (
    <div className="space-y-4">
      <Form.Input
        value={name || ''}
        onChange={handleNameChange}
        title="Field name"
        placeholder="Input your field name"
        required
        className="w-full"
      />

      {/* <Form.Textarea */}
      {/*   placeholder="What does this field do ?" */}
      {/*   value={desc || ''} */}
      {/*   onChange={handleDescChange} */}
      {/*   title="Description" */}
      {/*   className="w-full" */}
      {/* /> */}

      <div className="form-control flex items-center gap-2">
        <Form.Checkbox
          checked={isMultiple}
          onChange={handleMultipleChange}
        />
        <label>Allow multiple selection</label>
      </div>

      <div className="form-control flex items-center gap-2">
        <Form.Checkbox
          checked={isShowAllMember}
          onChange={handleAllMembersChange}
        />
        <label>Show all project members</label>
      </div>

      {!config?.allMembers && (
        <div className="form-control">
          <label>Select available members</label>
          <MultiMemberPicker
            value={selectedMembers}
            onChange={handleSelectedMembersChange}
          />
        </div>
      )}
    </div>
  )
} 
