import SettingExport from '@/features/SettingExport'
import { SettingFilterProvider } from '@/features/SettingExport/context'

export default function ExportImportPage() {
  return (
    <>
      <title>{`Setting > Export`}</title>
      <SettingFilterProvider>
        <SettingExport />
      </SettingFilterProvider>
    </>
  )
}
