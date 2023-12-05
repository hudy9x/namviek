import { Project } from '@prisma/client'
import { ObjectId } from 'bson'
import { projectModel } from './_prisma'

export const mdProjectAdd = async (data: Omit<Project, 'id'>) => {
  const id = new ObjectId().toString()
  return projectModel.create({
    data: { ...data, ...{ id } }
  })
}

export const mdProjectArchive = async (projectId: string, value: boolean) => {
  return projectModel.update({
    where: {
      id: projectId
    },
    data: {
      isArchived: value
    }
  })
}

export const mdProjectUpdate = async (data: Partial<Project>) => {
  const { id, ...rest } = data
  return projectModel.update({
    where: {
      id
    },
    data: rest
  })
}

export const mdProjectGetAllByIds = async (ids: string[], cond: {
  isArchived: boolean
}) => {
  const { isArchived } = cond
  const where: {
    [key: string]: unknown
  } = {}


  if (!isArchived) {

    where.OR = [
      {
        isArchived: {
          isSet: false
        }
      },
      {
        isArchived: false
      }
    ]
  } else {
    where.isArchived = true
  }

  console.log('where', where)


  return projectModel.findMany({
    where: {
      id: { in: ids },
      ...where
    }
  })
}

export const mdProjectGet = async (id: string) => {
  return projectModel.findFirst({
    where: {
      id
    }
  })
}
