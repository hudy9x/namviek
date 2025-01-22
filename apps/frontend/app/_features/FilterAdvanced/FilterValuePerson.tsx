import MultiMemberPicker from '@/components/MultiMemberPicker'
import { useProjectCustomFieldStore } from '@/store/customFields'
import { Prisma } from '@prisma/client'

interface FilterValuePersonProps {
  fieldId: string
  value: string
  onChange: (value: string) => void
  operator: string
}

export default function FilterValuePerson({ fieldId, value, onChange, operator }: FilterValuePersonProps) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const field = customFields?.find(cf => cf.id === fieldId)
  const config = (field?.data || {}) as Prisma.JsonObject
  const selectedMembers = (config.selectedMembers || []) as string[]

  return (
    <MultiMemberPicker
      value={value.split(',')}
      onChange={(val: string[]) => onChange(val.join(','))}
      displayedOptions={selectedMembers}
    />
  )
} 
