import { Button, DatePicker, Form } from '@shared/ui';
import MemberPicker from '../../../_components/MemberPicker';
import PrioritySelect from '../../../_components/PrioritySelect';
import { TaskPriority } from '@prisma/client';
import { useFormik } from 'formik';

export default function TaskForm() {
	const formik = useFormik({
		initialValues: {
			title: '',
			assigneeIds: [],
			priority: TaskPriority.LOW,
			dueDate: new Date(),
			desc: '<p>Tell me what this task about 🤡</p>'
		},
		onSubmit: values => {
			console.log(values);
		}
	});

	return (
		<form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
			<Form.Input
				title="Task name"
				value={formik.values.title}
				onChange={e => {
					formik.setFieldValue('title', e.target.value);
				}}
				placeholder="Enter your task name here !"
			/>
			<MemberPicker
				title="Assignees"
				value={{ id: '64a243d1fb17d4eadfa8da7d', title: 'Pham Huy' }}
				onChange={val => {
					console.log(val);
				}}
			/>
			<PrioritySelect
				title="Priority"
				value={formik.values.priority}
				onChange={val => {
          formik.setFieldValue('priority', val)
					console.log('alo', val);
				}}
			/>
			<DatePicker
				title="Due date"
				value={formik.values.dueDate}
				onChange={d => {
					formik.setFieldValue('dueDate', d);
				}}
			/>
			<Form.TextEditor
				title="Description"
				value={formik.values.desc}
				onChange={v => {
					formik.setFieldValue('desc', v);
				}}
			/>

			<Button type="submit" title="Submit now" primary block />
		</form>
	);
}
