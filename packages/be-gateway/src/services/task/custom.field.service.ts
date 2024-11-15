import { FieldType } from "@prisma/client"
import { pmClient } from "packages/shared-models/src/lib/_prisma"
import { buildTextQuery } from "./builders/text.builder"
import { buildNumberQuery } from "./builders/number.builder"
import { buildDateQuery } from "./builders/date.builder"
import { buildSelectQuery } from "./builders/select.builder"
import { buildBooleanQuery } from "./builders/boolean.builder"
import { TaskCustomFieldRepository } from "@shared/models"
import { buildPersonQuery } from "./builders/person.builder"

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
        return buildPersonQuery(fieldPath, item.operator, item.value)

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
      
      // Build and execute query
      const query = this.buildQueryFilter(projectId, filter, cursor)
      const results = await pmClient.task.findRaw({
        filter: query,
        options: {
          limit: safeLimit + 1,
          sort: { id: 1 },
        }
      })

      // Process results
      const normalizedResults = this.normalizeMongoResults(results as unknown as Record<string, any>[])
      const items = normalizedResults.slice(0, safeLimit)
      const hasNextPage = normalizedResults.length > safeLimit
      const nextCursor = hasNextPage ? items[items.length - 1].id : null

      return {
        status: 200,
        data: items,
        pageInfo: {
          hasNextPage,
          nextCursor
        }
      }
    } catch (error) {
      console.error('Custom field query error:', error)
      throw error
    }
  }

  private buildQueryFilter(projectId: string, filter: IFilterAdvancedData, cursor?: string) {
    const baseFilter = {
      projectId: { $eq: { $oid: projectId } },
      ...this.buildCustomFieldQuery(filter)
    }

    if (cursor) {
      baseFilter['_id'] = { $gt: cursor }
    }

    return baseFilter
  }

  private normalizeMongoResults(results: Record<string, any>[]) {
    return Array.from(results).map(task => {
      const normalized = { ...task }

      // Handle ObjectIds
      if (normalized._id?.$oid) normalized._id = normalized._id.$oid
      normalized.id = normalized._id
      if (normalized.projectId?.$oid) normalized.projectId = normalized.projectId.$oid

      // Handle Dates
      const dateFields = ['createdAt', 'updatedAt', 'dueDate', 'startDate', 'plannedStartDate', 'plannedDueDate']
      dateFields.forEach(field => {
        if (normalized[field]?.$date) normalized[field] = normalized[field].$date
      })

      // Handle Arrays
      if (Array.isArray(normalized.assigneeIds)) {
        normalized.assigneeIds = normalized.assigneeIds.map(id => id?.$oid || id)
      }
      if (Array.isArray(normalized.fileIds)) {
        normalized.fileIds = normalized.fileIds.map(id => id?.$oid || id)
      }

      return normalized
    })
  }
}
