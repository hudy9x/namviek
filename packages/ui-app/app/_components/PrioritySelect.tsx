import { TaskPriority } from '@prisma/client';
import { Form, ListItemValue } from '@shared/ui';
import { useCallback, useEffect, useState } from 'react';
import { RiFlag2Fill } from 'react-icons/ri';

const List = Form.List;

const colors = new Map();

colors.set(TaskPriority.URGENT, '#ff1345');
colors.set(TaskPriority.HIGH, '#ffce37');
colors.set(TaskPriority.NORMAL, '#13cfff');
colors.set(TaskPriority.LOW, '#ababab');

const options: ListItemValue[] = [
	{ id: TaskPriority.URGENT, title: 'Urgent' },
	{ id: TaskPriority.HIGH, title: 'High' },
	{ id: TaskPriority.NORMAL, title: 'Normal' },
	{ id: TaskPriority.LOW, title: 'Low' }
];

interface IPriorityProps {
	value?: TaskPriority;
	onChange?: (v: TaskPriority) => void;
	title?: string;
	placeholder?: string;
}

export default function PrioritySelect({ title, value, onChange, placeholder }: IPriorityProps) {
	const selectOption = options.find(opt => opt.id === value);
	console.log('select', selectOption);

	const [val, setVal] = useState(selectOption || options[2]);
	const [updateCounter, setUpdateCounter] = useState(0);

	useEffect(() => {
		if (updateCounter) {
			onChange && onChange(val.id as TaskPriority);
		}
	}, [updateCounter, val]);

	const selectedColor = colors.get(val.id);

	return (
		<List
			title={title}
			placeholder={placeholder}
			value={val}
			onChange={val => {
				setVal(val);
				setUpdateCounter(updateCounter + 1);
			}}>
			<List.Button>
				<div className="flex items-center gap-2">
					<RiFlag2Fill className="text-gray-200" style={{ color: selectedColor }} />
					<span>{val.title ? val.title : 'None'}</span>
				</div>
			</List.Button>
			<List.Options>
				{options.map(option => {
					const c = colors.get(option.id);
					return (
						<List.Item key={option.id} value={option}>
							<div className="flex items-center gap-2">
								<RiFlag2Fill style={{ color: c }} />
								{option.title}
							</div>
						</List.Item>
					);
				})}
			</List.Options>
		</List>
	);
}
