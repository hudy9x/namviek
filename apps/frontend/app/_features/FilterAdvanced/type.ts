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
  subValue?: string
}

export interface IFilterAdvancedData {
  condition: EFilterCondition
  // list: (IFilterAdvancedData | TFilterAdvancedItem)[]
  list: TFilterAdvancedItem[]
}

export const filterOperatorMap = new Map<FieldType, string[]>()
export const filterValueMap = new Map<FieldType, string[]>()

// =================== Field operator ===========================

export const emptyOperators = [
  'is empty',
  'is not empty'
]
const textOperators = [
  'is',
  'is not',
  'contains',
  'doesn\'t contain',
  'contains word',
  'doesn\'t contain word',
  'length is lower than',
  ...emptyOperators
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
  ...emptyOperators
])

filterOperatorMap.set(FieldType.CHECKBOX, [
  'is',
  ...emptyOperators
])

const dateOperators = [
  'is',
  'is not',
  'is before',
  'is after',
  // 'is within',
  ...emptyOperators
]

filterOperatorMap.set(FieldType.DATE, dateOperators)
filterOperatorMap.set(FieldType.CREATED_AT, dateOperators)
filterOperatorMap.set(FieldType.UPDATED_AT, dateOperators)

const selectOperators = [
  'contains',
  'doesn\'t contain',
  'is',
  'is not',
  ...emptyOperators
]

filterOperatorMap.set(FieldType.SELECT, selectOperators)
filterOperatorMap.set(FieldType.MULTISELECT, selectOperators)

const personOperators = [
  'contains',
  'doesn\'t contain',
  ...emptyOperators
]
filterOperatorMap.set(FieldType.PERSON, personOperators)
filterOperatorMap.set(FieldType.CREATED_BY, personOperators)
filterOperatorMap.set(FieldType.UPDATED_BY, personOperators)

filterOperatorMap.set(FieldType.FILES, [
  ...emptyOperators
])

// =================== Field value ===========================
export const RELATIVE_TIME_VALUES = [
  'days ago',
  'days from now',
  'weeks ago',
  'weeks from now',
  'months ago',
  'months from now',
  'years ago',
  'years from now'
]

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
  // ...RELATIVE_TIME_VALUES,
  'exact date'
])
