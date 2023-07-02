import { HiOutlineBars4 } from 'react-icons/hi2';

export const Configuration = () => {
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
				<div className='p-3 flex justify-between' >
					<input className='outline-none' placeholder='Create status' />
					<button>Create</button>
				</div>
			</div>
		</div>
	);
};
