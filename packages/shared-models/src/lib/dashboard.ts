import { Dashboard, DashboardComponent } from '@prisma/client'
import { dboardComponentModal, dboardModel } from './_prisma'

export const mdDBoardCreate = async (data: Omit<Dashboard, 'id'>) => {
  return dboardModel.create({
    data
  })
}

export const mdDBoardAddComponent = async (
  data: Omit<DashboardComponent, 'id'>
) => {
  return dboardComponentModal.create({
    data
  })
}
