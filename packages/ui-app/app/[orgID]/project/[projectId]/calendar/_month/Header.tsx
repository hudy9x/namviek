// import {days} from 'utils'
const days = [
  'Sunday',
  'Monday',
  'Tuseday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
export default function Header() {
  return (
    <div className="flex justify-around relative z-10 opacity-100">
      {days.map(day => (
        <div key={day} className="w-full text-center ">
          {day}
        </div>
      ))}
    </div>
  )
}
