import { useRequest } from "./_request"

export const useServiceProject = () => {
	const { post, get } = useRequest()

	const quickAddTask = async (data) => {

		return post('/api/task', {
		})
	}


	const getTasks = async() => {
		return get('/api/task')
	}

	return {
		quickAddTask,
		getTasks
	}
}


