
import { Project } from "@prisma/client"
import { memberModel } from "./_prisma"

export const mdMemberGetProject = async (uid: string) => {
	return memberModel.findMany({
		where: {
			uid: uid
		}
	})
}
