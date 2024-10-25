// import { Organization, OrganizationMembers } from '@prisma/client';
import { organizationModel as orgModel, organizationMembersModel as orgMemberModel, castToObjectId, IOrganizationField, IOrganizationMemberField } from '../schema';
import slugify from 'slugify';

export const mdOrgGetOne = async (orgId: string | string[]) => {
  return orgModel.findOne({
    _id: {
      $in: Array.isArray(orgId) ? orgId.map(castToObjectId) : [castToObjectId(orgId)]
    }
  });
};

export const mdOrgGetOneBySlug = async (slug: string) => {
  return orgModel.findOne({
    slug,
  });
};

export const mdOrgGet = async (projectId: string | string[]) => {
  return orgModel.find({
    _id: {
      $in: Array.isArray(projectId) ? projectId.map(castToObjectId) : [castToObjectId(projectId)]
    }
  });
};

export const mdOrgGetOwned = async (uid: string) => {
  return orgModel.find({
    createdBy: uid
  })
}

export const mdOrgAdd = async (data: Omit<IOrganizationField, 'id'>) => {
  return orgModel.create(data);
};

export const mdOrgUpdate = async (id: string, data: Partial<IOrganizationField>) => {

  return orgModel.findByIdAndUpdate(id, { $set: data })
}

export const mdOrgMemGetByUid = async (uid: string) => {
  return orgMemberModel.find({
    uid: castToObjectId(uid)
  });
};

export const mdOrgMemAdd = async (data: Omit<IOrganizationMemberField, 'id'>) => {
  return orgMemberModel.create(data);
};

export const mdOrgMemAddMany = async (data: Omit<IOrganizationMemberField, 'id'>[]) => {
  return orgMemberModel.insertMany(data);
};

export const generateSlug = (name: string) => {
  return slugify(name, {
    replacement: '-',
    lower: true,
    trim: true
  })
}
