import { Organization, OrganizationMembers } from '@prisma/client';
import { orgMemberModel, orgModel } from './_prisma';

export const mdOrgGetOne = async (projectId: string | string[]) => {
  return orgModel.findFirst({
    where: {
      id: {
        in: Array.isArray(projectId) ? projectId : [projectId]
      }
    }
  });
};

export const mdOrgGet = async (projectId: string | string[]) => {
  return orgModel.findMany({
    where: {
      id: {
        in: Array.isArray(projectId) ? projectId : [projectId]
      }
    }
  });
};

export const mdOrgAdd = async (data: Omit<Organization, 'id'>) => {
  return orgModel.create({
    data: data
  });
};

export const mdOrgMemGetByUid = async (uid: string) => {
  return orgMemberModel.findMany({
    where: {
      uid
    }
  });
};

export const mdOrgMemAdd = async (data: Omit<OrganizationMembers, 'id'>) => {
  return orgMemberModel.create({
    data
  });
};

export const mdOrgMemAddMany = async (data: Omit<OrganizationMembers, 'id'>[]) => {
  return orgMemberModel.createMany({
    data: data
  });
};
