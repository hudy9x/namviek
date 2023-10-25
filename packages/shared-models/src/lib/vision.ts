import { Vision } from '@prisma/client'
import { visionModel } from './_prisma'

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
    where.AND = [{ dueDate: { gte: start } }, { dueDate: { lte: end } }]
  }

  return visionModel.findMany({
    where
  })
}

export const mdVisionGetByOrg = async (organizationId: string) => {
  return visionModel.findMany({
    where: {
      organizationId
    }
  })
}

export const mdVisionAdd = async (data: Omit<Vision, 'id'>) => {
  return visionModel.create({
    data
  })
}

export const mdVisionDel = async (id: string) => {
  return visionModel.delete({
    where: {
      id
    }
  })
}

export const mdVisionUpdate = async ({
  id,
  data
}: {
  id: string
  data: Partial<Omit<Vision, 'id'>>
}) => {
  return visionModel.update({
    where: {
      id
    },
    data
  })
}
