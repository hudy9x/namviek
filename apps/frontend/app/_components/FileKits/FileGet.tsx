import useFileGet from './useFileGet'

export default function FileGet({ fileIds }: { fileIds: string[] }) {
  useFileGet(fileIds)
  return <></>
}
