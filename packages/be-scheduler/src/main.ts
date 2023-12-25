import cron from 'node-cron'
import { reqApi } from './req'
import { sharedCache } from '@shared/cache'

console.log(sharedCache())

cron.schedule('* * * * * *', async function () {
  try {
    await reqApi.get('/scheduler/remind-at-0845am')
  } catch (error) {
    console.log(error)
  }
})
