import { commentModel, ICommentField } from '../schema'

export class CommentRepository {
  async mdCommentAdd(data: Omit<ICommentField, 'id'>) {
    return commentModel.create(data)
  }

  async mdCommentAddMany(data: Omit<ICommentField, 'id'>[]) {
    return commentModel.insertMany(data)
  }

  async mdCommentDel(id: string) {
    return commentModel.findByIdAndDelete(id)
  }

  async mdCommentUpdate(id: string, data: Partial<Omit<ICommentField, 'id'>>) {
    return commentModel.findByIdAndUpdate(id, data, { new: true })
  }

  async mdCommentGetAllByTask(taskId: string) {
    return commentModel.find({ taskId })
  }

  async mdCommentGetAllByProject(projectId: string) {
    return commentModel.find({ projectId })
  }
}
