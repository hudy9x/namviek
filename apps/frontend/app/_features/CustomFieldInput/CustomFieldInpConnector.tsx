import { useEffect, useState } from "react"
import { useCustomFieldInputContext } from "./context"
import { Form, ListItemValue } from "@ui-components"
import { projectGridSv } from "@/services/project.grid"
import { HiOutlineLink } from "react-icons/hi"

const List = Form.List

interface ConnectorFieldConfig {
  targetGridCollectionId: string
  displayFieldId: string
}

interface ConnectorFieldProps {
  value: string // ID of the connected record
  config: string // JSON string containing targetGridCollectionId and displayFieldId
}

export default function CustomFieldInpConnector({ value, config }: ConnectorFieldProps) {
  const [options, setOptions] = useState<ListItemValue[]>([])
  const [selected, setSelected] = useState<ListItemValue | null>(null)
  const { onChange } = useCustomFieldInputContext()
  const [loading, setLoading] = useState(true)

  const parsedConfig = JSON.parse(config) as ConnectorFieldConfig

  useEffect(() => {
    const fetchTargetRecords = async () => {
      try {
        setLoading(true)

        const res = await projectGridSv.getConnectorOptions(parsedConfig.targetGridCollectionId)
        const { data }  = res.data.data
        console.log('data22', data)

        const transformedOptions = data.map((record: any) => ({
          id: record.id,
          title: record.customFields[parsedConfig.displayFieldId] || '(No name)',
          icon: null
        }))

        console.log('transformedOptions', transformedOptions)

        setOptions([
          { id: '', title: '(Empty)', icon: null },
          ...transformedOptions
        ])

        if (value) {
          const selectedOption = transformedOptions.find((opt: ListItemValue) => opt.id === value)
          if (selectedOption) {
            setSelected(selectedOption)
          }
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

  return (
    <div className="cf-input-container connector-field">
      <List
        onChange={(val: ListItemValue) => {
          setSelected(val)
          onChange(val.id)
        }}
        value={selected || options[0]}>
        <List.Button>
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
            {selected?.title || '(Empty)'}
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