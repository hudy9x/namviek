import FieldSelect from "./FieldSelect"
import { Button } from "@ui-components"
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2"
import { TFilterAdvancedItem } from "./type"
import ConditionSelect from "./ConditionSelect"
import { useProjectCustomFieldStore } from "@/store/customFields"
import FieldOperator from "./FieldOperator"
import FilterValue from "./FilterValue"
import FilterSubValue from "./FilterSubValue"
import { ReactNode } from "react"
import { useFilterAdvanced } from "./useFilterAdvancedStore"

function AddFilter() {

  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const { addFilter } = useFilterAdvanced()

  if (!customFields) return null

  const firstField = customFields[0]
  const onClick = () => {
    if (!firstField) return

    addFilter(0, {
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
  return <div className="space-y-1 py-2 px-1">
    <h2 className="font-bold">You have not yet created a filter</h2>
    <p className="text-xs text-gray-500">Filters allow you to show rows that apply to your conditions.</p>
  </div>
}

function FilterCondition({ index }: { index: number }) {
  const { switchCondition, filter } = useFilterAdvanced()
  const condition = filter.condition

  return <div className="w-[100px]">
    {index === 0
      ? <span className="pl-3">Where</span>
      : index === 1
        ? <ConditionSelect value={condition} onChange={switchCondition} />
        : <span className="pl-3">{condition}</span>}
  </div>
}

function FilterItem({ index, filterItem }: {
  index: number,
  filterItem: TFilterAdvancedItem
}) {


  const {
    changeFieldType,
    changeFilterOperator,
    changeValue,
    changeSubValue,
    deleteFilter } = useFilterAdvanced()

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <FilterCondition index={index} />

        <FieldSelect
          value={filterItem.id}
          onChange={val => changeFieldType(0, index, val)}
        />
        <FieldOperator
          value={filterItem.operator}
          type={filterItem.type}
          onChange={val => changeFilterOperator(0, index, val)}
        />
        <FilterValue
          value={filterItem.value}
          type={filterItem.type}
          fieldId={filterItem.id}
          onChange={val => changeValue(0, index, val)}
          operator={filterItem.operator}
        />
        <FilterSubValue
          type={filterItem.type}
          value={filterItem.value || ''}
          subValue={filterItem.subValue || ''}
          onChange={(val: string) => changeSubValue(0, index, val)}
        />
      </div>
      <Button
        leadingIcon={<HiOutlineTrash />}
        onClick={() => deleteFilter(index)}
      />
    </div>
  )
}

export default function FilterAdvancedModal({ children }: { children?: ReactNode }) {

  const { filter } = useFilterAdvanced()
  return (
    <div className="border bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-lg min-w-[300px] text-sm">
      <div className="space-y-2 px-3 py-3">
        <FilterEmpty enable={!filter.list.length} />

        {filter.list.map((filterItem, index) => (
          <FilterItem
            key={index}
            index={index}
            filterItem={filterItem}
          />
        ))}
      </div>
      <div className="px-3 py-2 flex items-center justify-between gap-3 border-t dark:border-gray-700">
        <AddFilter />
        <div className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </div>
  )
}
