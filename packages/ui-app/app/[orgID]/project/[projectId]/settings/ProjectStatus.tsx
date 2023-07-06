import { Button } from "@shared/ui";
import { useParams } from "next/navigation"
import { Popover } from "packages/shared-ui/src/components/Controls";
import { addStatus, delStatus, editStatus } from "packages/ui-app/services/task-status";
import { useTaskStatusStore } from "packages/ui-app/store/task-status";
import { useState } from "react";
import { HiOutlineBars4 } from "react-icons/hi2";

export const colors = [
	"red",
	"green",
	"blue",
	"yellow",
	"orange",
	"purple",
	"pink",
	"brown",
	"gray",
	"black",
	"white",
	"cyan",
	"magenta",
	"lime",
	"teal",
	"olive"
];

const DEFAULT_COLOR = 'white'

export const ProjectStatus = () => {
	const params = useParams();
	const [isShowEdit, setShowEditName] = useState<boolean>(false)
	const [visible, setVisible] = useState(false);
	const [name, setName] = useState<string>('')
	const { addTaskStatus, taskStatus, editTaskStatus, delTaskStatus } = useTaskStatusStore();
	const [isShowAction, setIsShowAction] = useState(false);

	const projectId = params.projectId 

	const handleCreateStatus = async () => {
		const order = taskStatus[projectId].length || 0
		addTaskStatus({ name, projectId, DEFAULT_COLOR, order })
		await addStatus({ name, projectId, color: DEFAULT_COLOR, order });
	}

	const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setName(value)
	}

	const handleChangeColor = async (color: string) => {
		editTaskStatus({ data: color, projectId })
		await editStatus({ data: color, projectId })
	}

	const handleDelete = async (id: number) => {
		delTaskStatus(projectId, id)
		await delStatus({ id, projectId })
	}

	const handleEdit = () => {
		
	}
	

	return (
		<div className="w-full ml-7">
			<h3 className="font-semibold"> Status Setting </h3>
			<div className="status-container">
				<div>
					{taskStatus[projectId].map((status, index) => (
						<div key={index} className="flex justify-between p-3 border-b-2"
							onMouseEnter={() => setIsShowAction(true)}
							onMouseLeave={() => setIsShowAction(false)}
						>
							<div className="flex items-center">
								<div className="text-2xl mr-2 text-gray-500">
									<HiOutlineBars4 />
								</div>
								<Popover
									triggerBy={<div style={{ backgroundColor: status.color }} className="color-container"></div>}
									content={
										<div className="color-list">
											{colors.map((color, index) => (
												<div key={index} style={{ backgroundColor: color }} onChange={() => handleChangeColor(color)} className="color"></div>
											))}
										</div>
									}
									visible={visible}
									onVisibleChange={setVisible}
								/>
								{isShowAction && <div className="mr-2" >
									<button onClick={() => handleDelete(index)} >Delete</button>
									<button onClick={() => handleEdit}>Edit</button>
								</div> }
								<div className="mr-2 text-gray-500">{status.name}</div>
							</div>
						</div>
					))}
				</div>
				<div className='p-3 flex justify-between border-t-2' >
					<input className='outline-none bg-indigo-50/50' placeholder='Create status' onChange={handleChangeStatus} />
					<Button title="Add" type="submit" size='sm' className="status-btn-add" onClick={handleCreateStatus} block primary />
				</div>
			</div>
		</div>
	);
}
