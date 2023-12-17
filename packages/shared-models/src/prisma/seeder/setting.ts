import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const mdProject = prisma.project
const mdProjectSetting = prisma.projectSetting

export const dummyProjectSetting = async () => {
  const points = [1, 2, 3, 5, 8]
  console.log('create dummy points to all projects', points)

  try {
    const projects = await mdProject.findMany()
    projects.forEach(async item => {
      const data = {
        projectId: item.id,
        urgentTaskStatus: false,
        overDueTaskStatus: false,
        todayTaskStatus: false,
      }
      const setting = await mdProjectSetting.create({
        data
      })
      console.log({ setting })
    })
  } catch (error) {
    console.log(error)
  }
}