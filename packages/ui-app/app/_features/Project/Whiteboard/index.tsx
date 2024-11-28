import FileKitContainer from '@/components/FileKits'
import dynamic from 'next/dynamic'
import { WhiteBoardProvider } from './context'

// Since client components get prerenderd on server as well hence importing
// the excalidraw stuff dynamically with ssr false

const ExcalidrawWrapper = dynamic(
  async () => (await import('./ExcalidrawWrapper')).default,
  {
    ssr: false
  }
)

export default function Page() {
  return (
    <WhiteBoardProvider>
      <ExcalidrawWrapper />
    </WhiteBoardProvider>
  )
}
