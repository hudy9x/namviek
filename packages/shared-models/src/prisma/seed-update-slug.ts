import { PrismaClient } from '@prisma/client'
import { updateAllSlug } from './seeder/organization'

const prisma = new PrismaClient()
async function main() {
  updateAllSlug().then(() => {
    console.log('Update all organization successfully')
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
