import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const mdAutomation = prisma.taskAutomation

export const dummyAutomation = () => {
  mdAutomation
    .create({
      data: {
        projectId: '649fe3033fdbc2fcad4d419e',
        organizationId: '649fc9fc6b46173ece783343',
        when: JSON.stringify({
          happens: 'task',
          is: 'PROGRESS_CHANGED',
          valueTo: '100',
          valueFrom: null,
          equal: null
        }),
        then: JSON.stringify({
          change: 'CHANGE_STATUS',
          value: '64a2741d10848bf6cbdd6e73'
        }),
        createdAt: new Date(),
        createdBy: '649ab9864792890df8449c68',
        updatedAt: null,
        updatedBy: null
      }
    })
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log('error', err)
    })
}
