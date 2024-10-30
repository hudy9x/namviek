import { taskModel } from "./_prisma"

export class TaskCustomFieldRepository {

  async update({ id }: { id: string, value: string, fieldId: string }) {
    console.log('123')
    taskModel.update({
      where: {
        id
      }
    })
  }
}
