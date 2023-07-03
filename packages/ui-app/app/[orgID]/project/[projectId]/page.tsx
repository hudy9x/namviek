import ProjectContainer from './ProjectContainer';

export default function Project({ params }: { params: { projectId: string } }) {
	console.log('params', params.projectId);
	return (
		<>
			<ProjectContainer />
		</>
	);
}
