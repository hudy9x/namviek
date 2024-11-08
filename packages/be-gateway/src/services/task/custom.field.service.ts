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
        }
      })

      // Convert MongoDB extended JSON format
      const resultsArray = Array.from(results as unknown as Record<string, any>[])
      const normalizedResults = resultsArray.map(task => {
        const normalized = { ...task }

        // Convert _id and other ObjectId fields
        if (normalized._id?.$oid) normalized._id = normalized._id.$oid
        normalized.id = normalized._id
        if (normalized.projectId?.$oid) normalized.projectId = normalized.projectId.$oid

        // Convert date fields
        if (normalized.createdAt?.$date) normalized.createdAt = normalized.createdAt.$date
        if (normalized.updatedAt?.$date) normalized.updatedAt = normalized.updatedAt.$date
        if (normalized.dueDate?.$date) normalized.dueDate = normalized.dueDate.$date
        if (normalized.startDate?.$date) normalized.startDate = normalized.startDate.$date
        if (normalized.plannedStartDate?.$date) normalized.plannedStartDate = normalized.plannedStartDate.$date
        if (normalized.plannedDueDate?.$date) normalized.plannedDueDate = normalized.plannedDueDate.$date

        if (Array.isArray(normalized.assigneeIds)) {
          normalized.assigneeIds = normalized.assigneeIds.map(id => id?.$oid || id)
        }

        if (Array.isArray(normalized.fileIds)) {
          normalized.fileIds = normalized.fileIds.map(id => id?.$oid || id)
        }

        return normalized
      })

      const items = normalizedResults.slice(0, safeLimit)
      const hasNextPage = normalizedResults.length > safeLimit
      const nextCursor = hasNextPage ? items[items.length - 1].id : null

      return {
        status: 200,
        // data: results
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
}
