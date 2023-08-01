import { DashboardComponent, DashboardComponentType } from '@prisma/client'
import DbCompSummary from './DbCompSummary'
import DbCompColumn from './DbCompColumn'

export default function DbComponent({
  component
}: {
  component: DashboardComponent
}) {
  const { type, title, config } = component
  const configJson = config as unknown as { [key: string]: unknown }
  return (
    <>
      {type === DashboardComponentType.SUMMARY ? (
        <DbCompSummary title={title || ''} config={configJson} />
      ) : null}
      {type === DashboardComponentType.COLUMN ? (
        <DbCompColumn title={title || ''} config={configJson} />
      ) : null}
    </>
  )
}
