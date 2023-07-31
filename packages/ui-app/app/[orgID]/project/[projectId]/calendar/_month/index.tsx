import { Body } from './Body'
import Header from './Header'

export default function Month() {
  return (
    <div className="flex flex-col h-[calc(100vh-83px)] overflow-hidden relative">
      <Header />
      <Body selectedDate={new Date()} />
    </div>
  )
}
