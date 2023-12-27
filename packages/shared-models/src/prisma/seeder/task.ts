import {
  Members,
  PrismaClient,
  TaskPoint,
  TaskPriority,
  TaskStatus
} from '@prisma/client'
import { CKEY, incrCache } from './redis'

const prisma = new PrismaClient()

const mdTask = prisma.task
const mdProject = prisma.project
const mdProjectMember = prisma.members
const mdPoint = prisma.taskPoint
const mdStatus = prisma.taskStatus

export const updateTaskCounter = async () => {
  const projects = await mdProject.findMany({})

  console.log(projects)
  // const counterKey = [CKEY.PROJECT_TASK_COUNTER, projectId]
  // const order = incrCache(counterKey)
  // mdTask.findMany({
  //   where: {
  //     order: { isSet: false }
  //   }
  // })
}

export const dummyTask = () => {
  console.log('dummy task ====================')
  mdProject.findMany().then(projects => {
    console.log('returned project list ')
    projects.map(project => {
      const promise = []

      console.log('get project status')
      promise.push(mdStatus.findMany({ where: { projectId: project.id } }))

      console.log('get project members')
      promise.push(
        mdProjectMember.findMany({
          where: {
            projectId: project.id
          }
        })
      )

      console.log('get project point')
      promise.push(
        mdPoint.findMany({
          where: {
            projectId: project.id
          }
        })
      )

      if (project.name !== 'remockup') return

      Promise.all(promise).then(([status, members, points]) => {
        if (!status || !status.length) return
        console.log('all returned')
        // console.log(points);

        const priorities = [
          TaskPriority.LOW,
          TaskPriority.NORMAL,
          TaskPriority.HIGH,
          TaskPriority.URGENT,
          null
        ]

        const randomStatus = () => {
          const n = status.length - 1
          const res = status[Math.round(Math.random() * n)] as TaskStatus
          return res ? res.id : null
        }

        const randomPoint = () => {
          const n = points.length - 1
          const res = points[Math.round(Math.random() * n)] as TaskPoint
          return res ? res.point : null
        }

        const randomMember = () => {
          const n = members.length - 1
          const res = members[Math.round(Math.random() * n)] as Members

          return res.uid
        }

        function genDuration(
          duration: number,
          month: number,
          year: number
        ): [Date, Date] {
          const startDate = new Date(year, month - 1, 1)
          const endDate = new Date(year, month, 0)

          const startDay = startDate.getDate()
          const endDay = endDate.getDate()

          const randomStartDay =
            Math.floor(Math.random() * (endDay - startDay + 1)) + startDay
          const randomEndDay = randomStartDay + duration

          const randomStartDate = new Date(year, month - 1, randomStartDay)
          const randomEndDate = new Date(year, month - 1, randomEndDay)

          return [randomStartDate, randomEndDate]
        }

        const tasks = [
          'Design homepage',
          'Develop navigation menu',
          'Optimize website for mobile devices',
          'Create contact form',
          'Implement search functionality',
          'Integrate social media sharing buttons',
          'Set up user registration and login system',
          'Design and implement product listing page',
          'Configure SSL certificate',
          'Optimize website speed and performance',
          'Create an About Us page',
          'Implement a blog section',
          'Add a FAQ section',
          'Integrate third-party APIs',
          'Perform cross-browser testing',
          'Implement a responsive design',
          'Set up website analytics',
          'Create a sitemap',
          'Implement a content management system',
          'Perform SEO optimization',
          'Design and implement a slideshow/banner',
          'Set up an online store',
          'Create and integrate a custom logo',
          'Implement an image gallery',
          'Add a testimonial section',
          'Implement website backup system',
          'Integrate a live chat feature',
          'Create a privacy policy page',
          'Implement Google Maps integration',
          'Perform cross-device testing',
          'Optimize website for accessibility'
        ]

        console.log('genereate random sdata')
        const taskDatas = []
        for (let i = 0; i < tasks.length; i++) {
          console.log('--------------------------')
          const taskStatusId = randomStatus()
          const assignee = [randomMember()]
          const t = tasks[i]

          const duration = Math.round(Math.random() * 4) + 1

          const [startDate, endDate] = genDuration(duration, 7, 2023)

          taskDatas.push({
            title: t,
            desc: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. NostrloremParaficia pariatur ut officia.',
            dueDate: endDate,
            startDate: startDate,
            projectId: project.id,
            priority: null,
            taskStatusId: taskStatusId,
            assigneeIds: assignee,
            taskPoint: null,
            createdAt: new Date(),
            createdBy: null,
            updatedAt: null,
            updatedBy: null
          })
        }

        mdTask
          .createMany({
            data: taskDatas
          })
          .then(res => {
            console.log('done')
          })
      })
    })
  })
}
