import useServiceProject from '@/services/useServiceProject'
import EmojiInput, { IEmojiInputProps } from './EmojiInput'

interface IProjectIconProps extends IEmojiInputProps {
  icon: string
  projectId: string
}

export default function ProjectIconPicker({
  icon,
  projectId,
  ...rest
}: IProjectIconProps) {
  const { projectDataUpdate } = useServiceProject()
  const updateProjectIcon = (val: string) => {
    projectDataUpdate({
      id: projectId,
      icon: val
    })
      .then(res => {
        console.log('update project cover ', res)
      })
      .catch(err => {
        console.log('update project error', err)
      })
  }

  return (
    <div title="Click me to change icon">
      <EmojiInput
        value={icon}
        onChange={val => {
          updateProjectIcon(val)
        }}
        {...rest}
      />
    </div>
  )
}
