import cron from 'node-cron'
import { reqApi } from './req'
import { sharedCache } from '@shared/cache'

console.log(sharedCache())

cron.schedule('45 8 * * *', async function () {
  try {
    await reqApi.get('/scheduler/remind-at-0845am')
  } catch (error) {
    console.log(error)
  }
})
