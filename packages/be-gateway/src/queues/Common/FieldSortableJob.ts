import { FieldService } from '../../services/field'
import { BaseJob } from '../BaseJob'

interface ISortatbleFieldData {
  id: string
  order: number
}

export class FieldSortableJob extends BaseJob {
  name = 'fieldSortable'
  fieldService: FieldService
  constructor() {
    super()
    this.fieldService = new FieldService()
  }
  async implement(data: ISortatbleFieldData[]) {
    console.log('implement field sortable')
    await this.fieldService.sortable(data)
    console.log('finish implementation')
  }
}
