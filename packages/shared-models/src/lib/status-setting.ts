import { StatusSetting } from "@prisma/client"
import { statusSettingModel } from "./_prisma"

export const mdStatusSettingAdd = async (data: Omit<StatusSetting, 'id'>) => {

	return statusSettingModel.create({
		data: data
	})
}

export const mdStatusSettingGetAll = async () => {
 return statusSettingModel.findMany()
}

export const mdStatusSettingDel =async (id : string) => {
 return statusSettingModel.delete({
  where: {
   id
  }
 })
}
