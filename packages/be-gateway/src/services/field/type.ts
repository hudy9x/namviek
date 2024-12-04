import { Field } from "@prisma/client"

export type FieldCreate = Omit<Field, 'id'>
export interface FieldFactoryBase {
  create(data: FieldCreate): Promise<Field>
}
