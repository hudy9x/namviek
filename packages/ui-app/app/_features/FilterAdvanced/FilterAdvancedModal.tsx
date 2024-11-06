import { FieldType } from "@prisma/client"
import { produce } from "immer"
import { useEffect, useState } from "react"
import FieldSelect from "./FieldSelect"
import { Button } from "@shared/ui"
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2"
import { EFilterCondition, IFilterAdvancedData, TFilterAdvancedItem, filterOperatorMap } from "./type"
import ConditionSelect from "./ConditionSelect"
import { useProjectCustomFieldStore } from "@/store/customFields"
import FieldOperator from "./FieldOperator"
import FilterValue from "./FilterValue"

/*
 *
 * {
  condition: AND
  filter: [
    { field, type, operator, value },
    { field, type, operator, value },
    {
      condition: OR
      filters: [
      	
      ] 
     }
  ]
}
 * */

function AddFilter({ onAdd }: { onAdd: (level: number, data: TFilterAdvancedItem) => void }) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  if (!customFields) return null

  const firstField = customFields[0]
  const onClick = () => {
    if (!firstField) return

    onAdd(0, {
      id: firstField.id,
      type: firstField.type,
      operator: '',
      value: ''
    })
  }

  return <div
    onClick={onClick}
    className="flex py-1 items-center gap-2 cursor-pointer group">
    <HiOutlinePlus className="w-4 h-4 text-gray-400 group-hover:text-gray-700" />
    <span className="text-xs">Add filter</span>
  </div>
}

function FilterEmpty({ enable }: { enable: boolean }) {
  if (!enable) return null
  return <div className="space-y-1">
    <h2 className="font-bold">You have not yet created a filter</h2>
    <p className="text-xs text-gray-500">Filters allow you to show rows that apply to your conditions.</p>
  </div>
}

function FilterCondition({ index, condition, switchCondition }: {
  index: number,
  condition: EFilterCondition,
  switchCondition: (condition: EFilterCondition) => void
}) {
  return <div className="w-[100px]">
    {index === 0
      ? <ConditionSelect value={condition} onChange={val => {
        switchCondition(val)
      }} />
      : <span className="pl-3">{condition}</span>}
  </div>
}

export default function FilterAdvancedModal() {
  const [filter, setFilter] = useState<IFilterAdvancedData>({
    condition: EFilterCondition.AND,
    list: []
  })

  const addFilter = (level: number, data: TFilterAdvancedItem) => {
    const nextState = produce(filter, draftState => {
      draftState.list.push(data)
    })

    setFilter(nextState)
  }

  const switchCondition = (condition: EFilterCondition) => {
    const nextState = produce(filter, draftState => {
      draftState.condition = condition
    })

    setFilter(nextState)
  }

  const changeFieldType = (level: number, index: number, val: { id: string, type: FieldType }) => {

    const operator = filterOperatorMap.get(val.type)
    const nextState = produce(filter, draftState => {
      draftState.list[index].id = val.id
      draftState.list[index].type = val.type
      draftState.list[index].value = ''
      if (operator) {
        draftState.list[index].operator = operator[0]
      }
    })

    setFilter(nextState)
  }

  const changeFilterOperator = (level: number, index: number, val: string) => {
    const nextState = produce(filter, draftState => {
      draftState.list[index].operator = val
    })

    setFilter(nextState)
  }

  const changeValue = (level: number, index: number, val: string) => {
    const nextState = produce(filter, draftState => {
      draftState.list[index].value = val
    })
    setFilter(nextState)
  }

  const deleteByIndex = (index: number) => {
    const nextState = produce(filter, draftState => {
      draftState.list = draftState.list.filter((item, idx) => idx !== index)
      // delete draftState.list[index]
    })

    setFilter(nextState)
  }

  useEffect(() => {
    console.log('filter', filter)
  }, [filter])

  return <div className="border bg-white rounded-md shadow-lg min-w-[300px] text-sm">
    <div className="space-y-2 px-3 py-3">
      <FilterEmpty enable={!filter.list.length} />

      {filter.list.map((filterItem, filterIndex) => {
        const key = filterIndex
        return <div key={key} className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FilterCondition index={filterIndex} condition={filter.condition} switchCondition={switchCondition} />

            <FieldSelect value={filterItem.id} onChange={val => {
              changeFieldType(0, filterIndex, val)
            }} />
            <FieldOperator value={filterItem.operator} type={filterItem.type} onChange={val => {
              changeFilterOperator(0, filterIndex, val)
            }} />
            <FilterValue type={filterItem.type}
              fieldId={filterItem.id}
              onChange={val => {
                changeValue(0, filterIndex, val)
              }}
              operator={filterItem.operator} />
          </div>
          <Button
            leadingIcon={<HiOutlineTrash />}
            onClick={() => {
              deleteByIndex(filterIndex)
            }} />

        </div>
      })}
    </div>
    <div className="px-3 py-2 flex items-center gap-3 border-t">
      <AddFilter onAdd={addFilter} />
    </div>
  </div>
}
