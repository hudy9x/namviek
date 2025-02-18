import { useEffect, useState } from "react"
import { useCustomFieldInputContext } from "./context"
import { Form, ListItemValue } from "@ui-components"
import { projectGridSv } from "@/services/project.grid"
import { PiEmpty } from "react-icons/pi"
import { useConnectorCache } from "./ConnectorCache"

const List = Form.List

interface ConnectorFieldConfig {
  targetGridCollectionId: string
  displayFieldId: string
  allowMultiple?: boolean
}

interface ConnectorFieldProps {
  value: string | string[]
  config: string
  fieldId: string
}

export default function CustomFieldInpConnector({ value, config, fieldId }: ConnectorFieldProps) {
  const [selected, setSelected] = useState<ListItemValue[]>([])
  const [options, setOptions] = useState<ListItemValue[]>([])
  const [loading, setLoading] = useState(false)
  const { onChange } = useCustomFieldInputContext()
  const { 
    getCache, 
    setCache, 
    getPendingRequest, 
    setPendingRequest, 
    deletePendingRequest 
  } = useConnectorCache()
  
  const parsedConfig = JSON.parse(config) as ConnectorFieldConfig
  const cacheKey = `${fieldId}-${parsedConfig.targetGridCollectionId}`

  useEffect(() => {
    let isMounted = true
    const fetchOptions = async () => {
      // Check cache first
      const cached = getCache(cacheKey)
      if (cached) {
        if (isMounted) {
          setOptions(cached)
        }
        return
      }

      // Check pending requests
      const pendingRequest = getPendingRequest(cacheKey)
      if (pendingRequest) {
        try {
          const res = await pendingRequest
          const { data } = res.data.data
          const transformedOptions = data.map((record: any) => ({
            id: record.id,
            title: record.customFields[parsedConfig.displayFieldId] || '(No name)',
            icon: null
          }))
          
          if (isMounted) {
            setOptions(transformedOptions)
          }
        } catch (error) {
          console.error('Error in pending request:', error)
        }
        return
      }

      setLoading(true)
      try {
        const requestPromise = projectGridSv.getConnectorOptions(parsedConfig.targetGridCollectionId)
        setPendingRequest(cacheKey, requestPromise)

        const res = await requestPromise
        const { data } = res.data.data

        const transformedOptions = data.map((record: any) => ({
          id: record.id,
          title: record.customFields[parsedConfig.displayFieldId] || '(No name)',
          icon: null
        }))

        const finalOptions = transformedOptions.length 
          ? transformedOptions 
          : [{ id: '', title: '(Empty)', icon: null }]

        if (isMounted) {
          setOptions(finalOptions)
          setCache(cacheKey, finalOptions)
        }
      } catch (error) {
        console.error('Error fetching connector options:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
        deletePendingRequest(cacheKey)
      }
    }

    fetchOptions()

    return () => {
      isMounted = false
    }
  }, [cacheKey])

  useEffect(() => {
    if (value && options.length) {
      const values = Array.isArray(value) ? value : value.split(',')
      const selectedOptions = values
        .map(v => options.find(opt => opt.id === v))
        .filter(Boolean) as ListItemValue[]
      setSelected(selectedOptions.length ? selectedOptions : [])
    }
  }, [value, options])

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
                  selected.map(item => (
                    <span key={item.id} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                      {item.title}
                    </span>
                  ))
                ) : (
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