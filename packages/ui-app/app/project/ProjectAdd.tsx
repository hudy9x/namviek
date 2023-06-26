'use client';

import { Form, Modal, Button } from '@shared/ui';
import { useFormik } from 'formik';
import { useState } from 'react';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { validateQuickAddProject } from '@shared/validation';
import { useServiceProject } from '../../services/project';
import { useOrganization } from '@clerk/nextjs';
import { useProjectStore } from 'packages/ui-app/store/project';

export default function ProjectAdd() {
	const { organization } = useOrganization();
	const { quickAddProject } = useServiceProject();
	const { addProject } = useProjectStore();
	const [visible, setVisible] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: '',
			desc: ''
		},
		onSubmit: values => {
			const { error, errorArr, data } = validateQuickAddProject(values);

			if (error) {
				console.log('error');
				formik.setErrors(errorArr);
				return;
			}

			console.log(data);
			setVisible(false);
			quickAddProject({
				...values,
				...{
					organizationId: organization?.id
				}
			})
				.then(res => res.json())
				.then(res => {
					const { status, data } = res;
					console.log('done');
					if (status !== 200) {
						return;
					}

					console.log('add new project to store');
					addProject(data);
				});
		}
	});

	return (
		<>
			<Modal
				visible={visible}
				onVisibleChange={setVisible}
				title="Create new project"
				triggerBy={
					<div>
						<HiOutlinePlusSm className="section-icon" />
					</div>
				}
				content={
					<>
						<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
							<Form.Input
								title="Project name"
								required
								name="name"
								error={formik.errors.name}
								onChange={formik.handleChange}
								value={formik.values.name}
							/>

							<Form.Textarea title="Desciption" name="desc" onChange={formik.handleChange} value={formik.values.desc} />

							<div className="flex justify-end">
								<Button type="submit" title="Create new" block primary />
							</div>
						</form>
					</>
				}
			/>
		</>
	);
}
