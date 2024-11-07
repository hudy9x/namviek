import { FieldType } from "@prisma/client"
import { pmClient } from "packages/shared-models/src/lib/_prisma"
import { buildTextQuery } from "./builders/text.builder"
import { buildNumberQuery } from "./builders/number.builder"
import { buildDateQuery } from "./builders/date.builder"
import { buildSelectQuery } from "./builders/select.builder"
import { buildBooleanQuery } from "./builders/boolean.builder"
import { TaskCustomFieldRepository } from "@shared/models"

export enum EFilterCondition {
  AND = 'AND',
  OR = 'OR'
}

export type TFilterAdvancedItem = {
  id: string
  type: FieldType
  operator: string
  value: string
}

export interface IFilterAdvancedData {
  condition: EFilterCondition
  list: TFilterAdvancedItem[]
}

export default class TaskCustomFieldService {
  customFieldRepo: TaskCustomFieldRepository
  constructor() {
    this.customFieldRepo = new TaskCustomFieldRepository()
  }

  async update(data: { value: string | string[], taskId: string, fieldId: string, type: FieldType }) {
    try {

      const result = await this.customFieldRepo.update({
        id: data.taskId,
        fieldId: data.fieldId,
        type: data.type,
        value: data.value
      })

      return result
    } catch (error) {
      console.log('Update Custom field error:', error)
      return null
    }
  }

  private buildCustomFieldQuery(filter: IFilterAdvancedData) {
    const conditions = filter.list.map(item => {
      return this.buildSingleFieldQuery(item)
    })

    if (!conditions || !conditions.length) return {}

    // Combine conditions based on AND/OR
    if (filter.condition === EFilterCondition.AND) {
      return { $and: conditions }
    } else {
      return { $or: conditions }
    }
  }

  private buildSingleFieldQuery(item: TFilterAdvancedItem) {
    const fieldPath = `customFields.${item.id}`

    switch (item.type) {
      case FieldType.NUMBER:
        return buildNumberQuery(fieldPath, item.operator, item.value)

      case FieldType.DATE:
        return buildDateQuery(fieldPath, item.operator, item.value)

      case FieldType.SELECT:
      case FieldType.MULTISELECT:
        return buildSelectQuery(fieldPath, item.operator, item.value)

      case FieldType.CHECKBOX:
        return buildBooleanQuery(fieldPath, item.operator, item.value)

      case FieldType.PERSON:
        return buildSelectQuery(fieldPath, item.operator, item.value)

      case FieldType.TEXT:
      case FieldType.URL:
      case FieldType.EMAIL:
      default:
        return buildTextQuery(fieldPath, item.operator, item.value)
    }
  }

  async queryCustomField(projectId: string, filter: IFilterAdvancedData) {
    try {
      console.log('Building query for filter:', filter)

      const query = this.buildCustomFieldQuery(filter)

      const _filter = {
        projectId: {
          $eq: { $oid: projectId }
        },
        ...query
      }
      console.log('Generated query:', JSON.stringify(_filter, null, 2))

      // const result = await pmClient.task.findRaw({
      //   filter: {
      //     projectId: {
      //       $eq: { $oid: projectId }
      //     }
      //   }
      // })
      //
      // console.log('result', result)

      const results = await pmClient.task.findRaw({
        filter: _filter,
        options: {
          projection: {
            id: 1,
            createdAt: 1,
            createdBy: 1,
            updatedAt: 1,
            updatedBy: 1,
            projectId: 1,
            customFields: 1,
            _id: 0
          }
        }
      })

      return {
        status: 200,
        data: results
      }
    } catch (error) {
      console.error('Custom field query error:', error)
      throw error
    }
  }
}
