import { Field } from "@prisma/client"
import { httpDel, httpGet, httpPost, httpPut } from "./_req"

type PartialField = Partial<Field>

export const fieldSv = {
  create(data: PartialField) {
    console.log('fieldSv.create', data)
    return httpPost('/api/fields', data)
  },

  getByProjectId(projectId: string,
    abortSignal?: AbortSignal
  ) {
    return httpGet(`/api/fields/${projectId}`, {
      signal: abortSignal
    })
  },

  delete(id: string) {
    return httpDel(`/api/fields/${id}`)
  },

  update(data: PartialField) {
    return httpPut('/api/fields', data)
  },

  sortable(fields: { id: string, order: number }[]) {
    return httpPut('/api/fields/sortable', { items: fields })
  }

}
