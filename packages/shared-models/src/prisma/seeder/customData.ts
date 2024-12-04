import { faker } from '@faker-js/faker'
import { FieldType } from '@prisma/client'
import { pmClient } from '../../lib/_prisma'

const generateFieldValue = async (type: FieldType, config: any, data: any, memberIds: string[]) => {
  switch (type) {
    case 'NUMBER':
      return faker.number.int({ min: 10, max: 70 })
    case 'TEXT':
      return faker.person.fullName()
    case 'DATE':
      return faker.date.between({ from: new Date(2024, 0, 1), to: new Date(2024, 11, 1) }).toISOString()
    case 'SELECT':
      // const options = config?.options || ['Option 1', 'Option 2', 'Option 3']
      const options = data?.options || []
      const item = faker.helpers.arrayElement(options) as any
      return item.value
    case 'MULTISELECT':
      // const multiOptions = config?.options || ['Option 1', 'Option 2', 'Option 3']
      const multiOptions = data?.options || []
      const selected = faker.helpers.arrayElements(multiOptions, { min: 1, max: 3 }) as { value: string, color: string }[]
      return selected.map(s => s.value)
    case 'CHECKBOX':
      return faker.datatype.boolean() ? 'true' : 'false'
    case 'URL':
      return faker.internet.url()
    case 'EMAIL':
      return faker.internet.email()
    case 'PHONE':
      return faker.phone.number()
    case 'PERSON':
      return faker.helpers.arrayElements(memberIds, { min: 1, max: 2 })
    default:
      return null
  }
}

export const generateCustomFieldData = async (projectId: string, totalRecords = 10) => {
  try {
    const [fields, members] = await Promise.all([
      pmClient.field.findMany({
        where: { projectId }
      }),
      pmClient.members.findMany({
        where: { projectId },
        select: { uid: true }
      })
    ])

    const memberIds = members.map(m => m.uid).filter(Boolean) as string[]

    let counter = 0
    for (let i = 0; i < totalRecords; i++) {
      const customFields = {}

      for (const field of fields) {
        customFields[field.id] = await generateFieldValue(field.type, field.config, field.data, memberIds)
      }

      const result = await pmClient.grid.create({
        data: {
          title: faker.lorem.sentence(),
          projectId,
          customFields,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      counter++
      console.log('inserted', counter, result.id)
    }

    console.log(`Created ${totalRecords} tasks with custom fields`)
  } catch (error) {
    console.error('Error generating custom field data:', error)
    throw error
  }
}

export const truncateCustomField = async (projectId: string) => {
  const promises = []
  promises.push(pmClient.grid.deleteMany({
    where: {
      projectId
    }
  }))
  promises.push(pmClient.field.deleteMany({
    where: {
      projectId
    }
  }))
  const result = await Promise.all(promises)
  console.log('done')
}

export const truncateData = async (projectId: string) => {
  const promises = []
  promises.push(pmClient.task.deleteMany({
    where: {
      projectId
    }
  }))
  const result = await Promise.all(promises)
  console.log('done')
}
