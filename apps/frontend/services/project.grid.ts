import { FieldType, Grid } from "@prisma/client"
import { httpDel, httpPost, httpPut } from "./_req"
import { IFilterAdvancedData } from "@/features/FilterAdvanced/type"

export interface ICustomFieldData {
  [fieldId: string]: { value: string, type: FieldType }
}

export const projectGridSv = {
  update(data: { value: string | string[], taskId: string, fieldId: string, type: FieldType }) {
    return httpPut('/api/project/grid', data)
  },

  get(
    gridId: string,
    filter: IFilterAdvancedData,
    signal?: AbortSignal,
    options?: {
      cursor?: string
      limit?: number
      orderBy?: { [key: string]: 'asc' | 'desc' }
    }
  ) {
    return httpPost('/api/project/grid/query', {
      gridCollectionId: gridId,
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

  create(data: Grid) {
    return httpPost('/api/project/grid/create', data)
  },

  delete(rowIds: string[]) {
    return httpDel('/api/project/grid/delete', {
      params: {
        rowIds
      }
    })
  },

  // New method for connector field
  getConnectorOptions(gridCollectionId: string) {
    return this.get(
      gridCollectionId,
      {
        condition: 'AND',
        list: []
      },
      undefined,
      {
        limit: 20
      }
    )
  }
}
