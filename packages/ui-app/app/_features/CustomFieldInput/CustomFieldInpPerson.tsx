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
  // const isShowAllMember = parsedConfig.allMembers || false
  const selectedMembers = parsedConfig.selectedMembers || null

  console.log('parseConfig', parsedConfig)

  // Parse the value (convert from JSON string to array/string)
  let parsedValue = isMultiple ? undefined : '';
  try {
    parsedValue = value ? JSON.parse(value) : (isMultiple ? undefined : '')
  } catch (error) {
    console.log('error', error)
  }

  const handleChange = (newValue: string | string[]) => {
    onChange(JSON.stringify(newValue))
  }

  if (isMultiple) {
    return (
      <MultiMemberPicker
        // compact={true}
        displayedOptions={selectedMembers}
        className='cf-input-container'
        value={parsedValue as string[] | undefined}
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
