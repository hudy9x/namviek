import { Organization, OrganizationMembers } from "@prisma/client"
import { orgMemberModel, orgModel } from "./_prisma"

export const mdGetOrgById = async (projectId: string) => {
	return orgModel.findFirst({
		where: {
			id: projectId
		}
	})
}

export const mdOrgAdd = async (data: Omit<Organization, 'id'>) => {

	return orgModel.create({
		data: data
	})
}

export const mdOrgMemAdd = async (data: Omit<OrganizationMembers, 'id'>) => {
	return orgMemberModel.create({
		data
	})
}

export const mdOrgMemAddMany = async (data: Omit<OrganizationMembers, 'id'>[]) => {
	return orgMemberModel.createMany({
		data: data
	})
}
