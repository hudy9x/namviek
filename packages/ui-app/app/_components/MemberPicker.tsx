import { useMemberStore } from '../../store/member';

import { TaskPriority } from '@prisma/client';
import { Avatar, Button, Form, ListItemValue } from '@shared/ui';
import { useEffect, useState } from 'react';
const List = Form.List;
const options: ListItemValue[] = [
  { id: TaskPriority.URGENT, title: 'Urgent' },
  { id: TaskPriority.HIGH, title: 'High' },
  { id: TaskPriority.NORMAL, title: 'Normal' },
  { id: TaskPriority.LOW, title: 'Low' }
];

interface IMemberPicker {
  title?: string;
}

export default function MemberPicker({ title }: IMemberPicker) {
  const { members } = useMemberStore(state => state);
  const [options, setOptions] = useState<ListItemValue[]>([{ id: '1', title: 'None' }]);
  const [val, setVal] = useState(options[0]);

  useEffect(() => {
    console.log(members);
    const listMembers = members.map(mem => ({ id: mem.id, title: mem.name }));
    setOptions(listMembers as ListItemValue[]);
    setVal(listMembers[0] as ListItemValue)
  }, [members]);

  const getSelectedMember = (id: string) => {
    const selectedMember = members.find(m => m.id === id);

    return (
      <div className='flex gap-2 items-center shrink-0'>
        <Avatar name={selectedMember?.name || ''} size="sm" src={selectedMember?.photo || ''} /> {selectedMember?.name}
      </div>
    );
  };

  return (
    <>
      <List title={title} value={val} onChange={setVal}>
        <List.Button>{getSelectedMember(val.id)}</List.Button>
        <List.Options>
          {options.map(option => (
            <List.Item key={option.id} value={option}>
              <div className="flex gap-2.5 items-center">
                <Avatar src={''} size="md" name={option.title || ''} />
                {option.title}
              </div>
            </List.Item>
          ))}
        </List.Options>
      </List>
    </>
  );
}
