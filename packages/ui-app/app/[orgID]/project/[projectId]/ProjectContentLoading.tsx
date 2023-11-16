import { Loading } from '@shared/ui'

export default function ProjectContentLoading() {
  return (
    <div
      className="absolute top-0 left-0 w-full z-20 flex items-center justify-center"
      style={{ height: 'calc(100vh - 83px)' }}>
      <Loading title='Loading....'/>
    </div>
  )
}
