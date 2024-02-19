import { Comment } from '@prisma/client'
import { pmClient } from './_prisma'

const mdComment = pmClient.comment
export class CommentRepository {
  async mdCommentAdd(data: Omit<Comment, 'id'>) {
    return mdComment.create({
      data
    })
  }

  async mdCommentAddMany(data: Omit<Comment, 'id'>[]) {
    return mdComment.createMany({
      data
    })
  }

  async mdCommentDel(id: string) {
    return mdComment.delete({
      where: {
        id
      }
    })
  }

  async mdCommentUpdate(id: string, data: Omit<Comment, 'id'>) {
    return mdComment.update({
      where: {
        id
      },
      data: data
    })
  }

  async mdCommentGetAllByTask(taskId: string) {
    return mdComment.findMany({
      where: {
        taskId: taskId
      }
    })
  }

  async mdCommentGetAllByProject(projectId: string) {
    return mdComment.findMany({
      where: {
        projectId: projectId
      }
    })
  }
}
