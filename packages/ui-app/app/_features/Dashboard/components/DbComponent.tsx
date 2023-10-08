import { DashboardComponent, DashboardComponentType } from '@prisma/client'
import DbCompSummary from './DbCompSummary'
import DbCompColumn from './DbCompColumn'
import { DbCompBurnChart } from './DbCompBurnChart'

export default function DbComponent({
  component
}: {
  component: DashboardComponent
}) {
  const { type, title, config, id } = component
  const configJson = config as unknown as { [key: string]: unknown }
  return (
    <>
      {type === DashboardComponentType.SUMMARY ? (
        <DbCompSummary id={id} title={title || ''} config={configJson} />
      ) : null}
      {type === DashboardComponentType.COLUMN ? (
        <DbCompColumn id={id} title={title || ''} config={configJson} />
      ) : null}
      {type === DashboardComponentType.BURNDOWN || type === DashboardComponentType.BURNUP ? (
        <DbCompBurnChart id={id} title={title || ''} config={configJson} type={type} />
      ) : null}
    </>
  )
}
