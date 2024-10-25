// import { Vision } from '@prisma/client'
// import { visionModel } from './_prisma'
import { visionModel, IVisionField, castToObjectId } from "../schema";

interface IFilterProps {
  month: number
}
export const mdVisionGetByProject = async (
  projectId: string,
  filter: IFilterProps
) => {
  const where: {
    [key: string]: unknown
  } = {}

  const { month } = filter

  if (projectId) {
    where.projectId = projectId
  }

  if (month) {
    const d = new Date()
    const year = d.getFullYear()
    const lastDate = new Date(year, month, 1)
    lastDate.setDate(lastDate.getDate() - 1)

    const start = new Date(year, month - 1, 1)
    start.setHours(0)

    const end = new Date(year, month - 1, lastDate.getDate())
    end.setHours(23)

    console.log(start, end)
    where.$and = [{ dueDate: { $gte: start } }, { dueDate: { $lte: end } }]
  }

  return visionModel.find({
    where
  })
}

export const mdVisionGetByOrg = async (organizationId: string) => {
  return visionModel.find({
    organizationId: castToObjectId(organizationId)
  })
}

export const mdVisionAdd = async (data: Omit<IVisionField, 'id'>) => {
  return visionModel.create(data)
}

export const mdVisionDel = async (id: string) => {
  return visionModel.findByIdAndDelete(id)
}

export const mdVisionUpdate = async ({
  id,
  data
}: {
  id: string
  data: Partial<Omit<IVisionField, 'id'>>
}) => {
  return visionModel.findByIdAndUpdate(id, data)
}
