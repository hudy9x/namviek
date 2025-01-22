import { StatusType } from '@prisma/client'
import { DropdownMenu } from '@ui-components'

export const StatusItemType = ({
  type,
  onStatusType
}: {
  type: StatusType
  onStatusType: (t: StatusType) => void
}) => {
  const listStatusType = [StatusType.TODO, StatusType.INPROCESS, StatusType.DONE]
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger
        className=""
        title={type}
        size="sm"
      />
      <DropdownMenu.Content className="text-xs">
        {listStatusType.map(t => (
          <DropdownMenu.Item
            key={t}
            onClick={() => onStatusType(t)}
            title={<p className="text-xs">{t}</p>}
          />
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
