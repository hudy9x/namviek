import { Field } from "@prisma/client"
import { httpDel, httpGet, httpPost, httpPut } from "./_req"

type PartialField = Partial<Field>

export const fieldSv = {
  create(data: PartialField) {
    return httpPost('/api/fields', data)
  },

  getByProjectId(projectId: string) {
    return httpGet(`/api/fields/${projectId}`)
  },

  delete(id: string) {
    return httpDel(`/api/fields/${id}`)
  },

  update(data: PartialField) {
    return httpPut('/api/fields', data)
  }

}
