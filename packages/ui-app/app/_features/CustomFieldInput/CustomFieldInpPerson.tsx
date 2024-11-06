import MultiMemberPicker from '@/components/MultiMemberPicker'
import { useCustomFieldInputContext } from './context'
import MemberPicker from '@/components/MemberPicker'

interface CustomFieldInpPersonProps {
  value: string  // JSON string containing selected member(s)
  config: string // JSON string containing configuration
}

export default function CustomFieldInpPerson({ value, config }: CustomFieldInpPersonProps) {
  const { onChange } = useCustomFieldInputContext()

  // Parse the configuration
  const parsedConfig = JSON.parse(config || '{}')
  const isMultiple = parsedConfig.multiple || false
  const isShowAllMember = parsedConfig.allMembers || false

  // Parse the value (convert from JSON string to array/string)
  const parsedValue = value ? JSON.parse(value) : (isMultiple ? [] : '')

  const handleChange = (newValue: string | string[]) => {
    onChange(JSON.stringify(newValue))
  }

  if (isMultiple) {
    return (
      <MultiMemberPicker
        value={parsedValue as string[]}
        onChange={handleChange}
      />
    )
  }

  return (
    <MemberPicker
      value={parsedValue as string}
      onChange={handleChange}
    />
  )
} 
