import { FieldType } from "@prisma/client"
import { httpDel, httpPost, httpPut } from "./_req"
import { ExtendedTask } from "@/store/task"
import { IFilterAdvancedData } from "@/features/FilterAdvanced/type"

export interface ICustomFieldData {
  [fieldId: string]: { value: string, type: FieldType }
}

export const projectGridSv = {
  update(data: { value: string | string[], taskId: string, fieldId: string, type: FieldType }) {
    return httpPut('/api/project/grid', data)
  },

  get(
    projectId: string,
    filter: IFilterAdvancedData,
    signal?: AbortSignal,
    options?: {
      cursor?: string
      limit?: number
      orderBy?: { [key: string]: 'asc' | 'desc' }
    }
  ) {
    return httpPost('/api/project/grid/query', {
      projectId,
      filter,
      options
    }, {
      signal
    })
  },

  updateMany(
    taskIds: string[],
    data: ICustomFieldData) {
    return httpPut('/api/project/grid/update-many', {
      taskIds,
      data
    })
  },

  create(data: ExtendedTask) {
    return httpPost('/api/project/grid/create', data)
  },

  delete(rowIds: string[]) {
    return httpDel('/api/project/grid/delete', {
      params: {
        rowIds
      }
    })
  }
}
