import { Field, FieldType } from "@prisma/client";
import { FieldFactoryBase } from "./type";
import { FieldTextStrategy } from "./create.text.field.strategy";
import { FieldNumberStrategy } from "./create.number.field.strategy";
import { FieldDateStrategy } from "./create.date.field.strategy";
import { FieldSelectStrategy } from "./create.select.field.strategy";
// import { FieldMultiSelectStrategy } from "./create.multiselect.field.strategy";
import { FieldCheckboxStrategy } from "./create.checkbox.field.strategy";
import { FieldRepository } from "@shared/models";

export class FieldService {
  fieldRepo: FieldRepository
  constructor() {
    this.fieldRepo = new FieldRepository()
  }

  async getAllByProjectId(projectId: string) {
    try {
      const result = await this.fieldRepo.getAllByProjectId(projectId)
      return result
    } catch (error) {
      throw new Error('FieldService.getAllByProjectId error')
    }
  }

  async delete(id: string) {
    await this.fieldRepo.delete(id)
  }

  async create(type: FieldType, data: Omit<Field, 'id'>) {
    console.log('123', type === FieldType.TEXT)

    let createFieldFactory: FieldFactoryBase

    switch (type) {
      case FieldType.URL:
      case FieldType.EMAIL:
      case FieldType.TEXT:
        createFieldFactory = new FieldTextStrategy()
        break

      case FieldType.NUMBER:
        createFieldFactory = new FieldNumberStrategy()
        break

      case FieldType.DATE:
        createFieldFactory = new FieldDateStrategy()
        break

      case FieldType.SELECT:
      case FieldType.MULTISELECT:
        createFieldFactory = new FieldSelectStrategy()
        break

      // createFieldFactory = new FieldMultiSelectStrategy()
      // break

      case FieldType.CHECKBOX:
        createFieldFactory = new FieldCheckboxStrategy()
        break
    }

    if (!createFieldFactory) throw new Error('Field type missing')

    const result = await createFieldFactory.create(data)

    return result

  }
}
