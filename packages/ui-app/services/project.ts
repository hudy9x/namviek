import { Project } from "@prisma/client"
import { useRequest } from "./_request"

type IProjectAdd = Pick<Project, 'name' | 'desc'>

export const useServiceProject = () => {
	const { post, get } = useRequest()

	const quickAddProject = async ({ name, desc }: IProjectAdd) => {

		return post('/api/project', {
			name,
			desc
		})
	}


	const getProjects = async() => {
		return get('/api/project')
	}

	return {
		quickAddProject,
		getProjects
	}
}




