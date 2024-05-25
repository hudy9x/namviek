import VisionListTask from './VisionListTask'
import VisionTimeline from '../VisionTimeline'

export default function VisionContainer({ visible }: { visible: boolean }) {

  return (
    <div className={`vision relative ${visible ? '' : 'hidden'}`}>
      <div
        className="flex"
        style={{ height: `calc(100vh - 98px)` }}>
        <VisionListTask />
        <VisionTimeline visible={true} />
      </div>
    </div>
  )
}
