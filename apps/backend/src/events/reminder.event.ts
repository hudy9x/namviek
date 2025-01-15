import { notifyToWebUsers } from '../lib/buzzer'
import { getJSONCache } from '../lib/redis'
import TaskReminderJob from '../jobs/reminder.job'
import { mdUserFindEmailsByUids } from '@shared/models'
import { sendEmail } from '../lib/email'

type RemindPayload = {
  message: string
  link: string
  receivers: string[]
}

export class ReminderEvent {
  taskReminderJob: TaskReminderJob
  constructor() {
    this.taskReminderJob = new TaskReminderJob()
  }
  async run() {
    try {
      const now = new Date()
      console.log('reminder.event called', now)

      const results = await this.taskReminderJob.findByTime(now)

      if (!results.length) return

      results.forEach(async k => {
        const data = await getJSONCache([k])
        if (!data) return

        this.sendNotification(data as RemindPayload)
        this.sendEmailReminder(data as RemindPayload)
        // const { receivers, message, link } = data as RemindPayload
        // if (!receivers || !receivers.length) return
        //
        // const receiverSets = new Set(receivers)
        // const filteredReceivers = Array.from(receiverSets)
        //
        // notifyToWebUsers(filteredReceivers, {
        //   title: 'Reminder ⏰',
        //   body: message,
        //   deep_link: link
        // })

        // sendEmail({
        //   emails,
        //   subject,
        //   html,
        // })
      })
    } catch (error) {
      console.log(error)
    }
  }

  async sendNotification(data: RemindPayload) {
    const { receivers, message, link } = data
    if (!receivers || !receivers.length) return

    const receiverSets = new Set(receivers)
    const filteredReceivers = Array.from(receiverSets)

    notifyToWebUsers(filteredReceivers, {
      title: 'Reminder ⏰',
      body: message,
      deep_link: link
    })
  }

  async sendEmailReminder(data: RemindPayload) {
    const { receivers, message, link } = data
    if (!receivers || !receivers.length) return

    const emails = await mdUserFindEmailsByUids(receivers)

    console.log(emails)
    if (!emails.length) return

    sendEmail({
      emails,
      subject: 'Reminder ⏰',
      html: `
${message}
Link: ${link}
`
    })
  }
}
