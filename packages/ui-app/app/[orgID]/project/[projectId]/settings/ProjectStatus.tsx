import { Button, randomId } from "@shared/ui";
import { useParams } from "next/navigation"
import { Popover } from "packages/shared-ui/src/components/Controls";
import { projectStatusAdd, projectStatusDel, projectStatusEdit } from "../../../../../services/status";
import { useTaskStatusStore } from "../../../../../store/taskStatus";
import { useState, KeyboardEvent, useLayoutEffect, useEffect } from "react";
import { HiOutlineBars4 } from "react-icons/hi2";
import { TaskStatus } from "@prisma/client";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

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
	const [visible, setVisible] = useState(false);
	const [color, setColor] = useState<string>('');
	const [editName, setEditName] = useState<string>('');
	const [name, setName] = useState<string>('')
	const { projectStatusAddStore, taskStatusAll, projectStatusEditStore, projectStatusDelStore, projectStatusInitialStore } = useTaskStatusStore();
	const [isShowAction, setIsShowAction] = useState(false);
	const [isOpenEditName, setIsOpenEditName] = useState(false);

	const projectId = params.projectId
	console.log(taskStatusAll, 'taskStatusAll')
	const handleCreateStatus = async () => {
		const order = taskStatusAll[projectId].length || 0
		const newTaskStatus: TaskStatus = {
			id: randomId(),
			name,
			color: DEFAULT_COLOR,
			order,
			projectId
		}
		projectStatusAddStore(newTaskStatus)
		await projectStatusAdd(newTaskStatus);
	}

	const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setName(value)
	}

	const handleDelete = async (id: string) => {
		projectStatusDelStore(projectId, id)
		await projectStatusDel(id)
	}

	const handleKeyPress = async (e: KeyboardEvent<HTMLDivElement>, id: string, index: number) => {
		if (isOpenEditName && e.key === 'Enter') {
			const data = {
				id,
				name: editName,
				color,
				order: index,
			}
			projectStatusEditStore(data, projectId)
			await projectStatusEdit(data)
		}
	}

	const handleChangeColor = (color: string) => {
		setColor(color)
		setVisible(false)
	}
	
	useEffect(() => {
		// Create key-value status in store
    if (Object.prototype.hasOwnProperty.call(taskStatusAll, params.projectId)) {
      return
    }
    projectStatusInitialStore(params.projectId)
	}, [params.projectId])

	console.log(color)
	return (
		<div className="w-full ml-7">
			<h3 className="font-semibold"> Status Setting </h3>
			<div className="status-container">
				<div>
					{taskStatusAll[projectId] && taskStatusAll[projectId].map((status, index) => (
						<div key={index} className="flex justify-between p-3 border-b-2"
							onKeyDown={(e) => handleKeyPress(e, status.id, index)}
							onMouseEnter={() => setIsShowAction(true)}
							onMouseLeave={() => setIsShowAction(false)}
						>
							<div className="flex items-center" >
								<div className="text-xl mr-2 text-gray-500">
									<HiOutlineBars4 />
								</div>
								<Popover
									triggerBy={<div style={{ backgroundColor: color ? color : status.color || DEFAULT_COLOR }} className="color-container"></div>}
									content={
										<div className="color-list">
											{colors.map((color, index) => (
												<div key={index} style={{ backgroundColor: color }} onClick={() => handleChangeColor(color)} className="color-item m-1"></div>
											))}
										</div>
									}
									visible={visible}
									onVisibleChange={setVisible}
								/>
								{isOpenEditName ? <input className='outline-none bg-indigo-50/50' defaultValue={status.name} onChange={(e) => setEditName(e.target.value)} value={editName} /> : <div className="mr-2 text-gray-500">{status.name}</div>}
							</div>
							<div className="flex items-center">
								<AiOutlineDelete
									onClick={() => handleDelete(status.id)}
									className="mr-2"
								/>
								<AiOutlineEdit
									onClick={() => setIsOpenEditName((prev) => !prev)}
								/>
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
