'use client';

import ProjectPoint from './ProjectPoint';

const Setting = () => {
	return (
		<div className="flex gap-8">
			<div>
				<div className="font-bold">Points</div>
				<div className="">Statuses</div>
				<div className="">Integrations</div>
			</div>
			<ProjectPoint />
		</div>
	);
};

export default Setting;
