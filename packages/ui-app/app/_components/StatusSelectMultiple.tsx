import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useMemo, useState } from 'react'
import { useProjectStatusStore } from '../../store/status'

const List = Form.List

interface IStatusSelectProps {
  value?: string[]
  noName?: boolean
  className?: string
  onChange?: (v: string[]) => void
  title?: string
  placeholder?: string
  maxDisplay?: number
}

let defaultStatusArr: ListItemValue[] = []
export default function StatusSelectMultiple({
  title,
  className,
  noName = false,
  value,
  onChange,
  placeholder,
  maxDisplay = 3
}: IStatusSelectProps) {

  const { statuses } = useProjectStatusStore()
  const [options, setOptions] = useState<ListItemValue[]>(defaultStatusArr)
  const selectedOption = options.filter(
    opt => value && value.some(v => v === opt.id)
  )
  const [val, setVal] = useState(
    selectedOption.length ? selectedOption : options[0] ? [options[0]] : []
  )
  const [updateCounter, setUpdateCounter] = useState(0)

  // update options list
  useEffect(() => {
    const statusList = statuses.map(stt => ({ id: stt.id, title: stt.name }))
    statusList.push({
      id: 'ALL',
      title: 'All statuses'
    })
    // cache the status array
    // here is why:
    // when a view changed, ex: board -> list or list -> calendar, ...
    // this component will be re-rendered because of parent context changed
    // so, `options` state will be empty at the first time
    // it causes the component re-render 2 times, once for empty options, the other for filled options
    // that's not smooth for user experience
    // due to, we should cache the status list
    // next time, when view changed, it will render cached first => no laggy anymore
    defaultStatusArr = statusList as ListItemValue[]
    setOptions(statusList as ListItemValue[])
  }, [statuses])

  // fill selectetd value after statues list updated
  useEffect(() => {
    if (options.length && value?.length) {

      const newVal: ListItemValue[] = []
      const optionMap = new Map<string, ListItemValue>()

      options.forEach(opt => {
        optionMap.set(opt.id, opt)
      })

      value.forEach(item => {
        const value = optionMap.get(item)
        if (value) {
          newVal.push(value)
        }
      })

      setVal(newVal)

    }
  }, [options, value])

  useEffect(() => {
    if (updateCounter > 0 && onChange) {
      const selectedArr = val.map(v => v.id)
      selectedArr && onChange(selectedArr)
    }
  }, [updateCounter])

  const selectedList = val
  const slicedList = val.slice(0, maxDisplay)
  const rest = val.slice(maxDisplay).length

  const bgOfAll = 'linear-gradient(45deg, rgba(226,40,130,1) 0%, rgba(226,40,142,1) 50%, rgba(30,235,107,1) 50%, rgba(30,235,213,1) 100%)'

  return (
    <div className={className}>
      <List
        multiple
        title={title}
        placeholder={placeholder}
        value={val}
        onMultiChange={val => {
          setVal(val)
          setUpdateCounter(updateCounter + 1)
        }}>
        <List.Button>
          {!selectedList || !selectedList.length ? <span className='text-transparent'>Option</span> : null}
          <div className="flex flex-wrap items-center gap-2">
            {slicedList.map(item => {
              const stt = statuses.find(stt => stt.id === item.id)
              const isAllOption = item.id === 'ALL' ? bgOfAll : stt?.color

              return (
                <div key={item.id} className="flex items-center gap-1">
                  <div
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{
                      backgroundColor: stt ? stt.color : isAllOption,
                      background: isAllOption
                    }}></div>
                  {noName ? null : <span className="status-title">{item.title}</span>}
                </div>
              )
            })}
            {rest ? <div>+{rest}</div> : null}
          </div>
        </List.Button>
        <List.Options width={200}>
          {options.map(option => {
            const stt = statuses.find(st => st.id === option.id)
            const isAllOption = option.id === 'ALL' ? bgOfAll : stt?.color
            return (
              <List.Item key={option.id} value={option} keepMeOnly={option.id === 'ALL'} >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ backgroundColor: stt?.color, background: isAllOption }}></div>
                  <span>{option.title}</span>
                </div>
              </List.Item>
            )
          })}
        </List.Options>
      </List>
    </div>
  )
}
