import { PrismaClient } from '@prisma/client'
import { createAdminUser } from './seeder/user'
const args = process.argv

const prisma = new PrismaClient()

async function main() {
  const [name] = args.slice(2)
  console.log('args: ', name)
  // createAdminUser().then(res => {
  //   console.log('created admin user')
  // })
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
