import { PrismaClient } from '@prisma/client'
import { createAdminUser, getOrgOwner } from './seeder/user'
import { createOrganization } from './seeder/organization'
import { createProject } from './seeder/project'
import { generateIconName, generateOrgName, generateProjectName } from './dummy'
import { runTest } from './seeder/test'
import { generateDailyData } from './seeder/report'
const args = process.argv

const prisma = new PrismaClient()

const createStarterData = () => {

  let userId = '';
  getOrgOwner('admin@gmail.com')
    .then(async res => {
      console.log('get email: ', res.email)
      userId = res.id
      try {
        const result = await createOrganization({
          name: generateOrgName(),
          uid: userId,
          cover: generateIconName()
        })

        console.log('created org: ', result.name)

        return result
      } catch (error) {
        throw new Error(error)
      }

    })
    .then(async org => {
      for (let i = 0; i < 4; i++) {
        const projectName = generateProjectName()

        await createProject({
          icon: generateIconName(),
          name: projectName,
          uid: userId,
          organizationId: org.id
        });

        console.log('created project:', projectName)
      }
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

    case 'daily-stats':
      await generateDailyData()
      break;

    case 'test':
      await runTest()
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
