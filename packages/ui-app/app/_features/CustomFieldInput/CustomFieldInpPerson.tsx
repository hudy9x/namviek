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

  // Parse the value (convert from JSON string to array/string)
  let parsedValue = (isMultiple ? undefined : value) as string | string[] | undefined

  try {
    if (isMultiple) {
      parsedValue = value.split(',') as string[]
    }
  } catch (error) {
    console.log('error', error)
  }

  const handleChange = (newValue: string | string[]) => {
    if (Array.isArray(newValue)) {
      onChange(newValue.join(','))
    } else {
      onChange(newValue)
    }
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
      className='cf-input-container'
      value={parsedValue as string}
      onChange={handleChange}
    />
  )
} 
