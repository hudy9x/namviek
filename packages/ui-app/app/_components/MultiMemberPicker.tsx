import { useMemberStore } from '../../store/member';
import { Avatar, Form, ListItemValue } from '@shared/ui';
import { useEffect, useState } from 'react';
const List = Form.List;

interface IMemberPicker {
  className?: string;
  title?: string;
  value?: string[];
  onChange?: (val: string[]) => void;
}

const defaultAssignee = { id: 'NONE', title: 'No assignee' };

export default function MultiMemberPicker({ title, onChange, value, className }: IMemberPicker) {
  const { members } = useMemberStore(state => state);
  const [options, setOptions] = useState<ListItemValue[]>([defaultAssignee]);
  const selectedOption = options.filter(opt => value && value.some(v => v === opt.id));
  const [val, setVal] = useState(selectedOption.length ? selectedOption : [options[0]]);
  const [updateCounter, setUpdateCounter] = useState(0);

  // update project member into list
  useEffect(() => {
    const listMembers = members.map(mem => ({ id: mem.id, title: mem.name }));
    setOptions(listMembers as ListItemValue[]);
  }, [members]);

  useEffect(() => {
    const selectedMembers = options.filter(m => value && value.some(v => v === m.id));
    selectedMembers.length ? setVal(selectedMembers) : setVal([defaultAssignee]);
  }, [options]);

  // call onChange everytime user select an other assignee
  useEffect(() => {
    updateCounter > 0 && onChange && onChange(val.map(v => v.id).filter(m => m !== defaultAssignee.id));
  }, [updateCounter]);

  const getSelectedMember = (selected: ListItemValue[]) => {
    const selectedMembers = members.filter(m => selected.some(s => s.id === m.id));
    if (!selectedMembers.length) {
      return (
        <div className="flex gap-2 items-center shrink-0 px-2 py-1.5 border rounded-md bg-gray-50">
          <Avatar name={'None'} size="sm" src={''} /> No one
        </div>
      );
    }

    return selectedMembers.map(sm => {
      return (
        <div key={sm.id} className="flex gap-2 items-center shrink-0 px-2 py-1.5 border rounded-md bg-gray-50">
          <Avatar name={sm.name || ''} size="sm" src={sm.photo || ''} /> {sm && sm.name ? sm.name : 'None'}
        </div>
      );
    });
  };

  return (
    <div className={className}>
      <List
        multiple
        title={title}
        value={val}
        onMultiChange={val => {
          setVal(val);
          setUpdateCounter(updateCounter + 1);
        }}>
        <List.Button>{getSelectedMember(val)}</List.Button>
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
    </div>
  );
}
