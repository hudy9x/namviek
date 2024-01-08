import { PrismaClient } from '@prisma/client'
import { dummyAutomation } from './seeder/automation'
import { dummyTask, updateTaskCounter } from './seeder/task'
import { dummyMemberToAllProject } from './seeder/member'
import { dummyProjectSetting } from './seeder/setting'

const prisma = new PrismaClient()

async function main() {
  dummyAutomation()
  dummyTask()
  dummyMemberToAllProject()
  dummyProjectSetting()

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
