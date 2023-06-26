import { Organization } from '@prisma/client';
import { useRequest } from './_request';

export const useServiceOrganization = () => {
	const { post, get } = useRequest();

	const addOrganization = async (data: Partial<Organization>) => {
		return post('/api/organization', {
			name: data.name
		});
	};

	const getOrgById = async () => {
		return get('/api/organization');
	};

	return {
		addOrganization,
		getOrgById
	};
};
