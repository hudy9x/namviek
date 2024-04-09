import { SchemaType, taskChecklistModel } from "./_prisma"

class BaseRepository {

  constructor(protected model: SchemaType) {
    this.model = model



  }

}
export class TaskChecklistRepository extends BaseRepository {
  constructor() {
    super(taskChecklistModel)
  }

  async create() {
    console.log('1')

    // taskChecklistModel.create({
    //   data
    // })
  }
}






