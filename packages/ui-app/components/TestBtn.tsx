'use client';
import { useAuth } from '@clerk/nextjs';

export default function TestBtn() {
	const { getToken } = useAuth();
	const onClick = async () => {
		fetch('http://localhost:3333/api/home', {
			headers: {
				Authorization: `Bearer ${await getToken()}`
			}
		});
	};

	return (
		<button className="px-2 py-1 text-sm rounded bg-indigo-400" onClick={onClick}>
			Click me
		</button>
	);
}
