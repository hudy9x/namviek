import { Project } from "@prisma/client"
import { httpPost } from "./_rq"
import { useAuth } from "@clerk/nextjs"

type IProjectAdd = Pick<Project, 'name' | 'desc'>


export const useServiceProject = async () => {
	const { getToken } = useAuth()

	const quickAddProject = async ({ name, desc }: IProjectAdd) => {

		return httpPost('/api/project', {
			name,
			desc
		})
	}
}


