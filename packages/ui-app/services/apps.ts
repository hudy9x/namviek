import { httpPost, httpPut, httpGet, httpDel } from "./_req"

export const applicationSv = {
  update(data: any) {
    return httpPut('/api/apps', data)
  },

  get(orgId: string) {
    return httpGet(`/api/apps/${orgId}`)
  },

  create(data: { name: string, desc?: string, orgId: string }) {
    return httpPost('/api/apps', data)
  },

  delete(id: string) {
    return httpDel(`/api/apps/${id}`)
  }
}
