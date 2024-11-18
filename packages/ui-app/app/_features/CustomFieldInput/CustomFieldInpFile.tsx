import { useCustomFieldInputContext } from "./context"
import FileKitProviderContainer from "@/components/FileKits/FileKitProviderContainer"

export default function CustomFieldInpFile({ value }: { value: string }) {

  const { onChange } = useCustomFieldInputContext()
  const handleUpdate = (val: string) => {
    // console.log(val, value)
    // if (val === value) return

    onChange(val)
  }

  return <FileKitProviderContainer taskId="123123120983" fileIds={['12398712', '189273918']} >
    <div className="cf-input-container">
      <div className="cf-display bg-transparent">

      </div>
    </div>
  </FileKitProviderContainer>
}
