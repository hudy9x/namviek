import { Comment } from '@prisma/client'
import { commentModel } from './_prisma'

export const mdCommentAdd = (data: Omit<Comment, 'id'>) => {
  return commentModel.create({
    data
  })
}

export const mdCommentAddMany = (data: Omit<Comment, 'id'>[]) => {
  return commentModel.createMany({
    data
  })
}

export const mdCommentDel = (id: string) => {
  return commentModel.delete({
    where: {
      id
    }
  })
}

export const mdCommentUpdate = (id: string, data: Omit<Comment, 'id'>) => {
  return commentModel.update({
    where: {
      id
    },
    data: data
  })
}

export const mdCommentGetAllByTask = (taskId: string) => {
  return commentModel.findMany({
    where: {
      taskId: taskId
    }
  })
}

export const mdCommentGetAllByProject = (projectId: string) => {
  return commentModel.findMany({
    where: {
      projectId: projectId
    }
  })
}
