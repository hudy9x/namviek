import { Organization } from '@prisma/client';
import { httpGet, httpPost, httpPut } from './_req';

export const orgCreate = (data: Partial<Organization>) => {
  return httpPost('/api/org', data);
};

export const orgUpdate = (data: Partial<Organization>) => {
  return httpPut('/api/org', data);
};

export const orgUpdateStorageConfig = (orgId: string, config: {
  bucketName: string
  region: string
  secretKey: string
  accessKey: string
}) => {
  return httpPut('/api/org-storage', {
    orgId,
    config
  })
}

export const orgStorageGet = (orgId: string) => {
  return httpGet('/api/org-storage', {
    params: { orgId }
  })
}

export const orgGet = () => {
  return httpGet('/api/org');
};

export const orgGetById = (orgID: string) => {
  return httpGet(`/api/org/${orgID}`)
}
