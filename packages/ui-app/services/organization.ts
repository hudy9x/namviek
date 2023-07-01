import { Organization } from '@prisma/client';
import { httpGet, httpPost } from './_req';

export const orgCreate = (data: Partial<Organization>) => {
	return httpPost('/api/org', data);
};

export const orgGet = () => {
	return httpGet('/api/org');
};
