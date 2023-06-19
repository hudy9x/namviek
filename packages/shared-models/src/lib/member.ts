
import { Members } from "@prisma/client"
import { memberModel } from "./_prisma"

export const mdMemberGetProject = async (uid: string) => {
	return memberModel.findMany({
		where: {
			uid: uid
		}
	})
}

export const mdMemberAdd = async (data: Omit<Members, 'id'>) => {

	return memberModel.create({
		data: data
	})
}
