import { Organization, OrganizationMembers } from '@prisma/client';
import { orgMemberModel, orgModel } from './_prisma';
import slugify from 'slugify';

export const mdOrgGetOne = async (orgId: string | string[]) => {
  return orgModel.findFirst({
    where: {
      id: {
        in: Array.isArray(orgId) ? orgId : [orgId]
      }
    }
  });
};

export const mdOrgGetOneBySlug = async (slug: string) => {
  return orgModel.findUnique({
    where: {
      slug,
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

export const mdOrgGetOwned = async (uid: string) => {
  return orgModel.findMany({
    where: {
      createdBy: uid
    }
  })
}

export const mdOrgAdd = async (data: Omit<Organization, 'id'>) => {
  return orgModel.create({
    data: data
  });
};

export const mdOrgUpdate = async (id: string, data: Partial<Organization>) => {

  return orgModel.update({
    data: data,
    where: {
      id: id
    }
  })
}

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

export const generateSlug = (name: string) => {
  return slugify(name, {
    replacement: '-',
    lower: true,
    trim: true
  })
}
