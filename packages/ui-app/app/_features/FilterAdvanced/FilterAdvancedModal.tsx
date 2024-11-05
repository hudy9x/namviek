import { FieldType } from "@prisma/client"
import { produce } from "immer"
import { useState } from "react"
import FieldSelect from "./FieldSelect"

enum EFilterType {
  AND = 'AND',
  OR = 'OR'
}
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
type TFilterAdvancedItem = {
  type: FieldType
  id: string
  operator: string
  value: string
}

interface IFilterAdvancedData {
  condition: EFilterType
  list: (IFilterAdvancedData | TFilterAdvancedItem)[]
}

export default function FilterAdvancedModal() {
  const [filter, setFilter] = useState<IFilterAdvancedData>({
    condition: EFilterType.AND,
    list: []
  })

  const addFilter = (level: number) => {
    const nextState = produce(filter, draftState => {
      draftState.list.push({
        type: FieldType.TEXT,
        id: '',
        operator: '',
        value: ''
      })
    })

    setFilter(nextState)

  }

  return <div>
    {filter.list.map((filterItem, filterIndex) => {
      return <div key={filterIndex}>
        <FieldSelect />
      </div>
    })}
    <button onClick={() => addFilter(0)}>Add item</button>
  </div>
}
