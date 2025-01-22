import { FieldRepository } from "@database";
import { FieldCreate, FieldFactoryBase } from "./type";
import { Field, Prisma } from "@prisma/client";

export class FieldSelectStrategy implements FieldFactoryBase {
  fieldRepo: FieldRepository
  constructor() {
    this.fieldRepo = new FieldRepository()
  }
  async create(data: FieldCreate): Promise<Field> {
    console.log('create select')
    const { data: fData, config: fConfig, ...restData } = data
    const fieldConfig = fConfig as Prisma.JsonObject
    const fieldData = fData as Prisma.JsonObject
    try {
      const result = await this.fieldRepo.create({
        ...{
          data: { ...fieldData },
          config: { ...{ width: 100 }, ...fieldConfig }
        },
        ...restData
      })
      return result
    } catch (error) {
      console.log(error)
      throw new Error('Create text field error')
    }
  }
}

