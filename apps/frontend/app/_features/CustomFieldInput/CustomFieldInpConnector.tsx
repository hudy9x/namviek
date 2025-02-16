import { useEffect, useState } from "react"
import { useCustomFieldInputContext } from "./context"
import { Form, ListItemValue } from "@ui-components"
import { projectGridSv } from "@/services/project.grid"
import { HiOutlineLink } from "react-icons/hi2"
import { PiEmpty } from "react-icons/pi"

const List = Form.List

interface ConnectorFieldConfig {
  targetGridCollectionId: string
  displayFieldId: string
  allowMultiple?: boolean
}

interface ConnectorFieldProps {
  value: string | string[] // Can be single ID or array of IDs
  config: string
}

export default function CustomFieldInpConnector({ value, config }: ConnectorFieldProps) {
  const [options, setOptions] = useState<ListItemValue[]>([])
  const [selected, setSelected] = useState<ListItemValue[]>([])
  const { onChange } = useCustomFieldInputContext()
  const [loading, setLoading] = useState(true)

  const parsedConfig = JSON.parse(config) as ConnectorFieldConfig

  useEffect(() => {
    const fetchTargetRecords = async () => {
      try {
        setLoading(true)
        const res = await projectGridSv.getConnectorOptions(parsedConfig.targetGridCollectionId)
        const { data } = res.data.data

        const transformedOptions = data.map((record: any) => ({
          id: record.id,
          title: record.customFields[parsedConfig.displayFieldId] || '(No name)',
          icon: null
        }))

        setOptions(transformedOptions.length ? transformedOptions : [{ id: '', title: '(Empty)', icon: null }])
        // Handle initial value(s)
        if (value) {
          const values = Array.isArray(value) ? value : value.split(',')
          const selectedOptions = values
            .map(v => transformedOptions.find(opt => opt.id === v))
            .filter(Boolean) as ListItemValue[]
          setSelected(selectedOptions.length ? selectedOptions : [options[0]])
        }
      } catch (error) {
        console.error('Error fetching connector data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTargetRecords()
  }, [parsedConfig.targetGridCollectionId, parsedConfig.displayFieldId, value])

  if (loading) {
    return <div className="cf-input-container">
      <div className="cf-display">Loading...</div>
    </div>
  }

  const handleSelectionChange = (value: ListItemValue[] | ((prev: ListItemValue[]) => ListItemValue[])) => {
    const newValue = typeof value === 'function' ? value(selected) : value
    setSelected(newValue)
    onChange(newValue.map(v => v.id).filter(id => id !== ''))
  }

  const handleSingleChange = (value: ListItemValue) => {
    setSelected([value])
    onChange(value.id)
  }
  
  return (
    <div className="cf-input-container connector-field">
      <List
        multiple={parsedConfig.allowMultiple}
        value={parsedConfig.allowMultiple ? selected : selected[0]}
        onChange={parsedConfig.allowMultiple ? undefined : handleSingleChange}
        onMultiChange={parsedConfig.allowMultiple ? handleSelectionChange : undefined}>
        <List.Button>
          <div className="inline-flex items-center gap-2">
            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-1 connector-item-container">
                {parsedConfig.allowMultiple ? (
                  // Multiple values display
                  selected.map(item => (
                    <span key={item.id} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                      {item.title}
                    </span>
                  ))
                ) : (
                  // Single value display
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                    {selected[0]?.title}
                  </span>
                )}
              </div>
            ) : (
              <PiEmpty className="w-3 h-3 text-gray-400" />
            )}
          </div>
        </List.Button>
        <List.Options width={200}>
          {options.map(option => (
            <List.Item key={option.id} value={option}>
              <div className="text-sm p-1">
                {option.title}
              </div>
            </List.Item>
          ))}
        </List.Options>
      </List>
    </div>
  )
} 