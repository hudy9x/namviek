import MultiMemberPicker from "@/components/MultiMemberPicker";
import { useTaskFilter } from "@/features/TaskFilter/context";
import { useUser } from "@goalie/nextjs";
import { memo } from "react";

function TimelineTaskFilter() {
  const { user } = useUser()
  const { filter, setFilterValue } = useTaskFilter()
  const { assigneeIds } = filter

  const updatedAssigneeIds = assigneeIds ? assigneeIds.map(uid => {
    if (uid === 'ME' && user?.id) {
      return user.id
    }

    return uid
  }) : []

  return <div>
    <MultiMemberPicker value={updatedAssigneeIds}
      onChange={val => {
        setFilterValue('assigneeIds', val)
      }}
      compact={true} all={true} />
  </div>
}

export default memo(TimelineTaskFilter)
