import { StatusSetting } from "@prisma/client"
import { useRequest } from "./_request"

type IStatusSetting = Pick<StatusSetting, 'name' | 'color'>

export const useServiceProject = () => {
	const { post, get, del } = useRequest()

	const quickAddStatusSetting = async ({ name, color }: IStatusSetting) => {

		return post('/api/status-setting', {
			name,
			color
		})
	}


	const getAllStatusSetting = async () => {
		return get('/api/status-setting')
	}

 const deleteStatusSetting = async (id : string) => {
  return del(`/api/status-setting/${id}`)
 }

	return {
		quickAddStatusSetting,
		getAllStatusSetting,
  deleteStatusSetting,
	}
}