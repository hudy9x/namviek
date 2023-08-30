import SettingExport from '@/features/SettingExport'
import { TaskFilterProvider } from '@/features/TaskFilter/context'

export default function ExportImportPage() {
  return (
    <TaskFilterProvider>
      <SettingExport />
    </TaskFilterProvider>
  )
}
