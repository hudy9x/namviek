import { Field, FieldType, Prisma } from "@prisma/client";
// import { FieldFactoryBase } from "./type";
// import { FieldTextStrategy } from "./create.text.field.strategy";
// import { FieldNumberStrategy } from "./create.number.field.strategy";
// import { FieldDateStrategy } from "./create.date.field.strategy";
// import { FieldSelectStrategy } from "./create.select.field.strategy";
// import { FieldCheckboxStrategy } from "./create.checkbox.field.strategy";
import { FieldRepository } from "@database";
import { pmClient } from "packages/database/src/lib/_prisma";

export class FieldService {
  fieldRepo: FieldRepository
  constructor() {
    this.fieldRepo = new FieldRepository()
  }

  async getAllByProjectId(projectId: string) {
    try {
      const result = await this.fieldRepo.getAllByProjectId(projectId)
      const sorted = result.sort((a, b) => a.order - b.order)

      return sorted
    } catch (error) {
      console.log(error)
      throw new Error('FieldService.getAllByProjectId error')
    }
  }

  async delete(id: string) {
    await this.fieldRepo.delete(id)
  }

  async sortable(items: { id: string, order: number }[]) {
    await pmClient.$transaction(async (tx) => {
      const updatePromises = []
      console.log('start updating')
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log('item', item.id, item.order)
        // await tx.field.update({
        //   where: {
        //     id: item.id
        //   },
        //   data: {
        //     order: item.order
        //   }
        // })

        updatePromises.push(tx.field.update({
          where: {
            id: item.id
          },
          data: {
            order: item.order
          }
        }))
      }

      const result = await Promise.all(updatePromises).catch(err => {
        console.log(err)
      })
      return result

      // return 1
    }, {
      timeout: 20000
    })
  }

  async update(data: Field) {
    const result = await this.fieldRepo.update(data.id, data)

    console.log('Updated custom field:', data.id, data.name, data.type)
    console.log(result)
    return result
  }

  async updateOrder() {
    console.log('update order')
    await pmClient.$transaction(async tx => {
      console.log('1')
    })
  }

  async create(type: FieldType, data: Omit<Field, 'id'>) {

    console.log('create custom field', type)

    const { data: fData, config: fConfig, ...restData } = data
    const fieldConfig = fConfig as Prisma.JsonObject
    const fieldData = fData as Prisma.JsonObject

    const result = await pmClient.$transaction(async (tx) => {
      const field = await tx.field.findFirst({
        where: {
          projectId: data.projectId
        },
        orderBy: {
          order: 'desc'
        },
        select: {
          order: true
        }
      })

      let biggestOrder = 0
      if (field && field.order >= 0) {
        biggestOrder = field.order + 1
      }

      console.log('fieldConfig', fieldConfig)
      console.log('restdata', restData)

      const createdField = await tx.field.create({
        data: {
          ...{
            width: 100,
            data: { ...fieldData },
            config: fieldConfig
          },
          ...restData,
          ...{ order: biggestOrder }
        }
      })

      return createdField

    })

    return result



    // const order = await this.fieldRepo.countProjectCustomField(data.projectId)
    //
    // try {
    //   const result = await this.fieldRepo.create({
    //     ...{
    //       width: 100,
    //       data: { ...fieldData },
    //       config: { ...{ width: 100 }, ...fieldConfig }
    //     },
    //     ...restData,
    //     ...{ order }
    //   })
    //
    //   return result
    // } catch (error) {
    //   console.log(error)
    //   throw new Error('Create custom field error')
    // }
    // ==============================================================================================================================================

    // let createFieldFactory: FieldFactoryBase
    //
    // switch (type) {
    //   case FieldType.URL:
    //   case FieldType.EMAIL:
    //   case FieldType.TEXT:
    //     createFieldFactory = new FieldTextStrategy()
    //     break
    //
    //   case FieldType.NUMBER:
    //     createFieldFactory = new FieldNumberStrategy()
    //     break
    //
    //   case FieldType.DATE:
    //     createFieldFactory = new FieldDateStrategy()
    //     break
    //
    //   case FieldType.SELECT:
    //   case FieldType.MULTISELECT:
    //     createFieldFactory = new FieldSelectStrategy()
    //     break
    //
    //   // createFieldFactory = new FieldMultiSelectStrategy()
    //   // break
    //
    //   case FieldType.CHECKBOX:
    //     createFieldFactory = new FieldCheckboxStrategy()
    //     break
    // }
    //
    // if (!createFieldFactory) throw new Error('Field type missing')
    //
    // const result = await createFieldFactory.create(data)
    //
    // return result

  }
}
