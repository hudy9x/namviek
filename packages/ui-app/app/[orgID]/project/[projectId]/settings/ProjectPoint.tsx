import { useParams, useRouter } from 'next/navigation';
import { TaskPoint } from '@prisma/client';
import { Input } from 'packages/shared-ui/src/components/Controls';
import { AiOutlineStar } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Field, Form, FieldArray, Formik, FieldProps } from 'formik';
import { useCallback, useEffect, useRef, useState } from 'react';
import { taskPointCreate, taskPointGet } from 'packages/ui-app/services/setting/point';

export default function ProjectPoint() {
	const [taskPointList, setTaskPointList] = useState<TaskPoint[]>([]);
	const inputAddRef = useRef<HTMLInputElement>(null);
	const { projectId } = useParams();
	// console.log(params);
	useEffect(() => {
		(async function () {
			const { data: _points } = (await taskPointGet(projectId)).data;
			console.log({ _points });
			setTaskPointList([..._points]);
		})();
	}, [projectId]);

	const deletePointItem = (id: string) => {
		setTaskPointList(currentList => currentList.filter(item => item.id !== id));
		handleUpdate();
		inputAddRef.current?.focus();
	};

	const handleUpdate = useCallback(() => {}, []);

	const handleAddNew = useCallback(
		async (v: number | undefined) => {
			if (v) {
				const { data } = (await taskPointCreate({ point: v, projectId } as Pick<TaskPoint, 'point' | 'projectId'>)).data;
				if (data) {
					setTaskPointList(currentList => [...currentList, data]);
					if (inputAddRef.current?.value) inputAddRef.current.value = '';
					inputAddRef.current?.focus();
					console.log(inputAddRef.current);
				}
			}
		},
		[projectId]
	);

	return (
		<div>
			<h2>Project Status</h2>
			<p>
				Story points are used to measured the ...
				<br />
				For instance: <b>1, 2, 3, 5, ... 100</b>{' '}
			</p>
			<div className="rounded-lg border">
				<Formik
					enableReinitialize={true}
					initialValues={{ pointItems: [...taskPointList] }}
					onSubmit={values => {
						handleUpdate();
						inputAddRef.current?.focus();
					}}>
					{({ values }) => (
						<Form>
							<FieldArray
								name="points"
								render={arrayHelpers => (
									<div>
										{values.pointItems &&
											values.pointItems.length > 0 &&
											values.pointItems.map((item, index) => (
												<Field key={index} name={`pointItems.${index}.point`}>
													{({ field: { onChange, name, value }, form, meta }: FieldProps) => {
														return (
															<Input
																name={name}
																onChange={onChange}
																type="number"
																value={value}
																leadingIcon={<AiOutlineStar />}
																tailing={
																	<div className="flex absolute right-0">
																		<CiEdit className="cursor-pointer" onClick={() => console.log('yolo')} />
																		<RiDeleteBinLine className="cursor-pointer" onClick={() => deletePointItem(item.id)} />
																	</div>
																}
															/>
														);
													}}
												</Field>
											))}
									</div>
								)}
							/>
							<button type="submit" hidden>
								Submit
							</button>
						</Form>
					)}
				</Formik>
				<div
					onKeyDown={e => {
						if (e.key === 'Enter' && inputAddRef.current?.value) {
							handleAddNew(parseInt(inputAddRef.current.value));
						}
					}}>
					<Input placeholder="Insert new points here" type="number" ref={inputAddRef} />
				</div>
			</div>
		</div>
	);
}
