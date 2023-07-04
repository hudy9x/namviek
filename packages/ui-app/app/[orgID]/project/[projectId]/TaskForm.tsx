import { TaskPriority } from '@prisma/client';
import { Button, DatePicker, Form, ListItemValue } from '@shared/ui';
import MemberPicker from '../../../_components/MemberPicker';
import { useState } from 'react';

const List = Form.List;
const options: ListItemValue[] = [
	{ id: TaskPriority.URGENT, title: 'Urgent' },
	{ id: TaskPriority.HIGH, title: 'High' },
	{ id: TaskPriority.NORMAL, title: 'Normal' },
	{ id: TaskPriority.LOW, title: 'Low' }
];

export default function TaskForm() {
	const [val, setVal] = useState(options[2]);

	return (
		<form className='flex flex-col gap-6'>
			<Form.Input title="Task name" placeholder="Enter your task name here !" />
			<MemberPicker title='Assignees' />
			<List title="Priority" value={val} onChange={setVal}>
				<List.Button>{val.title}</List.Button>
				<List.Options>
					{options.map(option => (
						<List.Item key={option.id} value={option}>
							{option.title}
						</List.Item>
					))}
				</List.Options>
			</List>
      <DatePicker />
			<Form.Textarea title="Description" />
		</form>
	);
}
