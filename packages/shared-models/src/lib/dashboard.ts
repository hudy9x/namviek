import { Dashboard, DashboardDetail } from '@prisma/client'
import { dboardDetailModel, dboardModel } from './_prisma'

export const mdDBoardCreate = async (data: Omit<Dashboard, 'id'>) => {
  return dboardModel.create({
    data
  })
}

export const mdDBoardAddComponent = async (
  data: Omit<DashboardDetail, 'id'>
) => {
  return dboardDetailModel.create({
    data
  })
}
