import { PrismaClient } from '@prisma/client'
import { createAdminUser } from './seeder/user'
import { createOrganization } from './seeder/organization'
import { createProject } from './seeder/project'
const args = process.argv

const prisma = new PrismaClient()

const createStarterData = () => {

  let userId = '';
  createAdminUser()
    .then(async res => {
      console.log('created admin user')
      userId = res.id
      try {
        const result = await createOrganization({
          name: 'Torchucs',
          uid: userId,
          cover: 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f951.png'
        })

        return result
      } catch (error) {
        throw new Error(error)
      }

    })
    .then(async org => {
      await createProject({
        name: 'Project 1',
        uid: userId,
        organizationId: org.id
      })
    })
    .catch(err => {
      console.log(err)
    })
}

async function main() {
  const [type, value] = args.slice(2)
  console.log('>>>>>>')
  console.log('type', type)
  console.log('value', value)
  console.log('>>>>>>')
  switch (type) {
    case 'user':
      createAdminUser(value).then(res => {
        console.log(`
An user has been created !
=============================================
account: ${res.email}
password: ${process.env.DEFAULT_PWD || '123123123'}
=============================================
`)
      })
      break;

    case 'starter':
      createStarterData()
      break;

    default:
      break;
  }
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
