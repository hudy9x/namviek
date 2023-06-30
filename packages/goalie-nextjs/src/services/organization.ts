import { Organization } from '@prisma/client';
import { httpGet, httpPost } from './_req';

export const orgCreate = (data: Partial<Organization>) => {
  return httpPost('/api/org', data).then(res => {
    const { status } = res;

    if (status !== 200) {
      return Promise.reject('CREATE_ORG_ERROR');
    }

    const { data } = res.data;
    const organization = data as Organization

    console.log(organization)
    

    return Promise.resolve('SUCCESS');
  });
};

export const orgGet = () => {
  return httpGet('/api/org');
};
