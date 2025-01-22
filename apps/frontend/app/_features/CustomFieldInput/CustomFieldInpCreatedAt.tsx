import { format, formatDistanceToNowStrict, isValid } from 'date-fns'
export default function CustomFieldInpCreatedAt({ value, config }: { value: string, config: string }) {

  const defaultConfig = (JSON.parse(config) || {}) as { format: string, includeTime: boolean }

  const includeTime = defaultConfig.includeTime ? ' HH:mm' : ''
  const toNow = defaultConfig.format === 'from-now'
  const dateFormat = defaultConfig.format + includeTime

  const showDateStr = (d: Date) => {
    if (toNow || dateFormat === 'from-now') {
      return formatDistanceToNowStrict(d, { addSuffix: true })
    }

    if (dateFormat) {
      try {
        const formatData = format(d, dateFormat)
        return formatData
      } catch (error) {
        console.log('datepicker format string error: ', error)
        return format(d, 'PP')
      }
    }

    return format(d, 'PP')
  }
  console.log('value', value)
  return <div key={value} className="cf-edit">{value ? showDateStr(new Date(value)) : null}</div>
}
