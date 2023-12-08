import cron from 'node-cron'
import { reqApi } from './req'

// cron.schedule('*/2 * * * * *', () => {
cron.schedule('45 8 * * *', () => {
  try {
    console.log('cron run')
    reqApi.get('/scheduler/remind-at-0845am')
  } catch (error) {
    console.log(error.message)
  }
})
