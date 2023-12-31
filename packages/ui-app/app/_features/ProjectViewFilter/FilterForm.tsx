import ListPreset from "@/components/ListPreset";
import PointSelect from "@/components/PointSelect";
import PrioritySelect from "@/components/PrioritySelect";
import { Form } from "@shared/ui";
import { ETaskFilterGroupByType } from "../TaskFilter/context";
import { useProjectViewContext } from "../ProjectView/context";

export default function FilterForm() {

  const { customView, setCustomView, filter, setFilterValue } = useProjectViewContext()
  const hidden = customView ? '' : 'hidden'
  const { date, point, priority, groupBy } = filter

  return <>
    <div className="flex items-center gap-2 mb-3">
      <Form.Checkbox checked={customView} onChange={stt => setCustomView(stt)} />
      <span className="text-sm text-gray-500">Add some filter to make an unique view.</span>
    </div>


    <div className={`flex flex-wrap items-center gap-2 mb-6 ${hidden}`}>
      <ListPreset
        // title="Date"
        className="w-[150px]"
        value={date}
        onChange={val => {
          setFilterValue('date', val)
        }}
        width={200}
        options={[
          { id: 'today', title: '📆 Today' },
          { id: 'yesterday', title: '📆 Yesterday' },
          { id: 'tomorrow', title: '📆 Tomorrow' },
          { id: 'prev-week', title: '📆 Prev week' },
          { id: 'prev-month', title: '📆 Prev month' },
          { id: 'this-week', title: '📆 This week' },
          { id: 'this-month', title: '📆 This month' },
          { id: 'next-week', title: '📆 Next week' },
          { id: 'next-month', title: '📆 Next month' },
          { id: 'not-set', title: '📆 Not set' },
        ]}
      />

      <PointSelect

        value={point}
        onChange={val => {
          setFilterValue('point', val)
        }}
        zero={true}
        infinite={true} />

      <PrioritySelect
        // title="Priority"
        all={true}
        width={130}
        value={priority}
        onChange={val => {
          setFilterValue('priority', val)
        }}
      />
    </div>

    <div className={`mb-6 ${hidden}`}>
      <div className="text-sm text-gray-500 mb-3">Group this by.</div>
      <ListPreset
        // title="Group by"
        value={groupBy}
        onChange={val => {
          setFilterValue('groupBy', val as ETaskFilterGroupByType)
        }}
        className="w-[150px] mr-1"
        width={150}
        options={[
          {
            id: ETaskFilterGroupByType.STATUS,
            title: 'Status',
            icon: '🚦'
          },
          {
            id: ETaskFilterGroupByType.ASSIGNEE,
            title: 'Assignees',
            icon: '🤓'
          },
          {
            id: ETaskFilterGroupByType.PRIORITY,
            title: 'Priority',
            icon: '🚩'
          }
          // { id: ETaskFilterGroupByType.WEEK, title: 'Week', icon: '📅' }
        ]}
      />
    </div>
  </>
}
