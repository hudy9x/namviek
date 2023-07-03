import { Button } from "@shared/ui";
import { useParams, useRouter } from "next/navigation"
import { addStatus } from "packages/ui-app/services/task-status";
import { HiOutlineBars4 } from "react-icons/hi2";

export const ProjectStatus = () => {
	const params = useParams();

	 const handleCreateStatus = async () => {
			const name = 'Nam'
			const color = 'red'
			const projectId = params.projectId
			const result = await addStatus({ name, color, projectId });
			console.log(result, 'result')
		}

  return (
		<div className="w-full ml-7">
			<h3 className="font-semibold"> Status Setting </h3>
			<div className="status-container">
				<div>
					<div className="flex justify-between p-3 border-b-2">
						<div className="flex items-center">
							<div className="text-2xl mr-2 text-gray-500">
								<HiOutlineBars4 />
							</div>
							<div className="color w-4 h-4 bg-orange-900 rounded-sm mr-2"></div>
							<div className="mr-2 text-gray-500">Status</div>
						</div>
						<div>
							<div className="status-tag">Backlog</div>
						</div>
					</div>
					<div className="flex justify-between p-3 border-b-2">
						<div className="flex items-center">
							<div className="text-2xl mr-2 text-gray-500">
								<HiOutlineBars4 />
							</div>
							<div className="color w-4 h-4 bg-orange-900 rounded-sm mr-2"></div>
							<div className="mr-2 text-gray-500">Status</div>
						</div>
						<div>
							<div className="status-tag">Backlog</div>
						</div>
					</div>
				</div>
				<div className='p-3 flex justify-between border-t-2' >
					<input className='outline-none bg-indigo-50/50' placeholder='Create status' />
					<Button title="Add" type="submit" size='sm'className="status-btn-add" onClick={handleCreateStatus} block primary />
				</div>
			</div>
		</div>
	);
}
