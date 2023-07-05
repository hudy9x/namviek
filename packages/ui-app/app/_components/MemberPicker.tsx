import { useMemberStore } from '../../store/member';

import { Avatar, Form, ListItemValue } from '@shared/ui';
import { useCallback, useEffect, useState } from 'react';
const List = Form.List;

interface IMemberPicker {
	title?: string;
	value?: ListItemValue;
	onChange?: (val: ListItemValue) => void;
}

export default function MemberPicker({ title, onChange, value }: IMemberPicker) {
	const { members } = useMemberStore(state => state);
	const [options, setOptions] = useState<ListItemValue[]>([{ id: '1', title: 'None' }]);
	const [val, setVal] = useState(options[0]);
	const [updateCounter, setUpdateCounter] = useState(0);

	// update project member into list
	useEffect(() => {
		const listMembers = members.map(mem => ({ id: mem.id, title: mem.name }));
		setOptions(listMembers as ListItemValue[]);
		setVal(listMembers[0] as ListItemValue);
	}, [members]);

	// fill selected if available
	useEffect(() => {
		if (value && value.id && members.length) {
			setVal(value);
		}
	}, [members, value]);

	// call onChange everytime user select an other assignee
	useEffect(() => {
		updateCounter > 0 && onChange && val.id && onChange(val);
	}, [val, onChange, updateCounter]);

	const getSelectedMember = (id: string) => {
		const selectedMember = members.find(m => m.id === id);

		return (
			<div className="flex gap-2 items-center shrink-0">
				<Avatar name={selectedMember?.name || ''} size="sm" src={selectedMember?.photo || ''} /> {selectedMember?.name}
			</div>
		);
	};

	return (
		<>
			<List
				title={title}
				value={val}
				onChange={val => {
					setVal(val);
					setUpdateCounter(updateCounter + 1);
				}}>
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
