import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GoalieUser } from './types';
import { clearGoalieUser, getDecodeRefreshToken } from './lib/util';

export default function useGoalieInProtectionMode({ user }: { user: GoalieUser | null }) {
	const signinPage = '/sign-in';
	const publicPages = ['/sign-in', '/sign-up'];
	const pathname = usePathname();
	const { push } = useRouter();

	const onAuth = (user: GoalieUser, pathname: string) => {
		const now = Date.now();
    const decoded = getDecodeRefreshToken()
		const exp = decoded.exp; // it is refresh token expired time

		// refresh token expired
    // redirect to /sign-in
		if (exp * 1000 < now) {
			clearGoalieUser();
			return push('/sign-in');
		}

		const notLogin = !user;
		const notInsidePublicPages = !publicPages.some(p => p.includes(pathname));
		const insidePublicPages = !notInsidePublicPages;

		if (notLogin) {
			if (notInsidePublicPages) {
				push(signinPage);
			}
		} else if (insidePublicPages) {
			push('/');
		}
	};

	useEffect(() => {
		user && onAuth(user, pathname);
	}, [user, pathname]);
}
