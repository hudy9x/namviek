import { StatusType } from '@prisma/client'
import { DropdownMenu } from '@shared/ui'

export const StatusItemType = ({
  type,
  onStatusType
}: {
  type: StatusType
  onStatusType: (t: StatusType) => void
}) => {
  const listStatusType = Object.values(StatusType)
  return (
    <div>
      <DropdownMenu>
        <DropdownMenu.Trigger
          className="btn-trigger-no-border w-3"
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
    </div>
  )
}
