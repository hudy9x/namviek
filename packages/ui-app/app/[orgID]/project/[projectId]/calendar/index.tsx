import CalMonthContainer from './CalMonthContainer'
import './style.css'

export default function Calendar() {
  const date = new Date()
  const view = 'month'
  return (
    <div>{view === 'month' ? <CalMonthContainer date={date} /> : null}</div>
  )
}
