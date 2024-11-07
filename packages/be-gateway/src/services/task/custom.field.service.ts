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
  subValue?: string
}

export interface IFilterAdvancedData {
  condition: EFilterCondition
  list: TFilterAdvancedItem[]
}

interface PaginationOptions {
  limit?: number
  cursor?: string
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
        return buildDateQuery(fieldPath, item.operator, item.value, item.subValue)

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

  async queryCustomField(
    projectId: string,
    filter: IFilterAdvancedData,
    pagination: PaginationOptions = {}
  ) {
    try {
      const { limit = 50, cursor } = pagination
      const safeLimit = Math.min(limit, 100)

      const query = this.buildCustomFieldQuery(filter)

      // Base filter with project ID
      const _filter = {
        projectId: {
          $eq: { $oid: projectId }
        },
        ...query
      }

      // If cursor exists, add the cursor condition
      if (cursor) {
        _filter['_id'] = { $gt: cursor }
      }

      const results = await pmClient.task.findRaw({
        filter: _filter,
        options: {
          limit: safeLimit + 1,
          sort: { id: 1 },
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

      console.log('restuls', results)

      const resultsArray = Array.from(results as unknown as Record<string, unknown>[])
      const items = resultsArray.slice(0, safeLimit)
      const hasNextPage = resultsArray.length > safeLimit
      const nextCursor = hasNextPage ? items[items.length - 1].id : null

      return {
        status: 200,
        // data: results
        data: {
          items,
          pageInfo: {
            hasNextPage,
            nextCursor
          }
        }
      }
    } catch (error) {
      console.error('Custom field query error:', error)
      throw error
    }
  }
}
