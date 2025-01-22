import { FieldType } from '@prisma/client'
import { DatePicker, Form } from '@ui-components'
import { RELATIVE_TIME_VALUES } from './type'

interface FilterSubValueProps {
  type: FieldType
  value: string
  subValue: string
  onChange: (value: string) => void
}

export default function FilterSubValue({ type, subValue, value, onChange }: FilterSubValueProps) {
  if (type !== FieldType.DATE && type !== FieldType.CREATED_AT && type !== FieldType.UPDATED_AT) return null


  // Show number input for relative time values
  const isRelativeTime = RELATIVE_TIME_VALUES.some(timeValue => value.includes(timeValue))

  console.log('type', type, value, isRelativeTime)

  if (isRelativeTime) {
    return (
      <Form.Input
        value={subValue}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  // Show date picker for exact date
  if (value === 'exact date') {
    return (
      <div className="w-[150px]">
        <DatePicker
          value={subValue ? new Date(subValue) : undefined}
          onChange={(date) => onChange(date.toISOString())}
          placeholder="Date"
        />
      </div>
    )
  }

  return null
} 
