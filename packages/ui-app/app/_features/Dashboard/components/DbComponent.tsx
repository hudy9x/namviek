import { DashboardComponent, DashboardComponentType } from '@prisma/client'
import DbCompSummary from './DbCompSummary'

export default function DbComponent({
  component
}: {
  component: DashboardComponent
}) {
  const { type, title, config } = component
  const configJson = config as unknown as { [key: string]: unknown }
  return (
    <div>
      {type === DashboardComponentType.SUMMARY ? (
        <DbCompSummary title={title || ''} config={configJson} />
      ) : null}
    </div>
  )
}
