import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GoalieUser } from './types';

export default function useGoalieInProtectionMode({user}: {user: GoalieUser | null}) {
	const signinPage = '/sign-in';
	const publicPages = ['/sign-in', '/sign-up'];
	const pathname = usePathname();
	const { push } = useRouter();


  console.log('useGoalieprotect', user)

	useEffect(() => {

		const notLogin = !user;
    console.log('notelogin', notLogin, user)
		const notInsidePublicPages = !publicPages.some(p => p.includes(pathname));
		const insidePublicPages = !notInsidePublicPages;

		if (notLogin) {
			if (notInsidePublicPages) {
				push(signinPage);
			}
		} else if (insidePublicPages) {
			push('/');
		}
	}, [user, pathname]);
}
