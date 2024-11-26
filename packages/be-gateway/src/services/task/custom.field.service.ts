import { FieldType } from "@prisma/client"
import { pmClient } from "packages/shared-models/src/lib/_prisma"
import { buildTextQuery } from "./builders/text.builder"
import { buildNumberQuery } from "./builders/number.builder"
import { buildDateQuery } from "./builders/date.builder"
import { buildSelectQuery } from "./builders/select.builder"
import { buildBooleanQuery } from "./builders/boolean.builder"
import { GridRepository } from "@shared/models"
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
  page?: number
}

export default class GridService {
  gridRepo: GridRepository
  constructor() {
    this.gridRepo = new GridRepository()
  }

  async updateMany(uid: string, rowIds: string[], data: {
    [fieldId: string]: { value: string, type: FieldType }
  }) {
    console.log(rowIds, data)
    const promises = []
    for (const rowId of rowIds) {
      promises.push(this.gridRepo.updateMultiField(uid, {
        id: rowId,
        data
      }))
    }

    const results = await Promise.allSettled(promises)

    console.log('results', JSON.stringify(results[0], null, ' '))
    return results
  }

  async update(uid: string, data: { value: string | string[], taskId: string, fieldId: string, type: FieldType }) {
    try {

      const result = await this.gridRepo.update(uid, {
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

  async create(uid: string, data: { projectId: string }) {
    try {
      const result = await this.gridRepo.create(uid, {
        projectId: data.projectId,
      })

      return result
    } catch (error) {
      console.log('Create Custom field error:', error)
      return null
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
      const { limit = 50, cursor, page = 1 } = pagination
      const safeLimit = Math.min(limit, 100)

      // Get total count for pagination info
      const countQuery = this.buildQueryFilter(projectId, filter)
      let countResults = await pmClient.grid.findRaw({
        filter: countQuery
      })
      const totalCount = Array.isArray(countResults) ? countResults.length : 0
      countResults = null

      // Build and execute query
      const query = this.buildQueryFilter(projectId, filter, cursor)
      console.log('query', JSON.stringify(query, null, ' '))
      const results = await pmClient.grid.findRaw({
        filter: query,
        options: {
          limit: safeLimit + 1,
          sort: { _id: 1 },
        }
      })

      // Process results
      const normalizedResults = this.normalizeMongoResults(results as unknown as Record<string, any>[])
      const items = normalizedResults.slice(0, safeLimit)
      console.log('items', items.length)
      const hasNextPage = normalizedResults.length > safeLimit
      const nextCursor = hasNextPage ? items[items.length - 1].id : null

      return {
        status: 200,
        data: items,
        pageInfo: {
          hasNextPage,
          nextCursor,
          totalPages: Math.ceil(totalCount / safeLimit),
          totalRecords: totalCount,
          currentPage: page
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
      baseFilter['_id'] = { $gt: { $oid: cursor } }
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
