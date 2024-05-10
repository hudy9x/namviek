import { PrismaClient } from '@prisma/client'
import { createAdminUser } from './seeder/user'

const prisma = new PrismaClient()

async function main() {
  createAdminUser().then(res => {
    console.log('created admin user')
  })
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
