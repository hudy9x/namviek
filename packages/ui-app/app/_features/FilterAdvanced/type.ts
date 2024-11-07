import { FieldType, FileType } from "@prisma/client"

export enum EFilterCondition {
  AND = 'AND',
  OR = 'OR'
}

export type TFilterAdvancedItem = {
  type: FieldType
  id: string
  operator: string
  value: string
}

export interface IFilterAdvancedData {
  condition: EFilterCondition
  // list: (IFilterAdvancedData | TFilterAdvancedItem)[]
  list: TFilterAdvancedItem[]
}

export const filterOperatorMap = new Map<FieldType, string[]>()
export const filterValueMap = new Map<FieldType, string[]>()

// =================== Field operator ===========================

const textOperators = [
  'is',
  'is not',
  'contains',
  'doesn\'t contain',
  'contains word',
  'doesn\'t contain word',
  'length is lower than',
  'is empty',
  'is not empty'
]
filterOperatorMap.set(FieldType.TEXT, textOperators)
filterOperatorMap.set(FieldType.URL, textOperators)
filterOperatorMap.set(FieldType.EMAIL, textOperators)

filterOperatorMap.set(FieldType.NUMBER, [
  'is',
  'is not',
  'contains',
  'doesn\'t contain',
  'higher than',
  'higher than or equal',
  'lower than',
  'lower than or equal',
  'is even and whole',
  'is empty',
  'is not empty'
])

filterOperatorMap.set(FieldType.CHECKBOX, [
  'is',
  'is empty',
  'is not empty'
])

filterOperatorMap.set(FieldType.DATE, [
  'is',
  'is not',
  'is before',
  'is on or before',
  'is after',
  'is on or after',
  'is within',
  'is empty',
  'is not empty'
])

const selectOperators = [
  'contains',
  'doesn\'t contain',
  'is',
  'is not',
  'is empty',
  'is not empty'
]
filterOperatorMap.set(FieldType.SELECT, selectOperators)
filterOperatorMap.set(FieldType.MULTISELECT, selectOperators)

// =================== Field value ===========================
filterValueMap.set(FieldType.DATE, [
  'today',
  'yesterday',
  'tomorrow',
  'one week ago',
  'this week',
  'next week',
  'one month ago',
  'this month',
  'next month',
  'one year ago',
  'this year',
  'next year',
  
  'days ago',
  'days from now',
  'weeks ago',
  'weeks from now',
  'months ago',
  'months from now',
  'years ago',
  'years from now',
  'exact date'
])
