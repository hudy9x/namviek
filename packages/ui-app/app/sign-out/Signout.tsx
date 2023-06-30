'use client';
import { clearAllGoalieToken, clearGoalieUser } from '@goalie/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Signout() {
  const { push } = useRouter();

  useEffect(() => {
    clearAllGoalieToken();
    clearGoalieUser();
    push('/sign-in');
  }, []);
  return <></>;
}
