'use client';
import { clearAllGoalieToken, clearGoalieUser, useUser } from '@goalie/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Signout() {
  const { user } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      console.log('clear cache token')
      clearAllGoalieToken();
      console.log('clear goalie user info')
      clearGoalieUser();
      console.log('redirecting to /sign-in ...')
      push('/sign-in');
    }, 500);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-[400px] text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-700">See you soon, {user?.name} !</h2>
        <p className="text-gray-500 text-base">
          I have to say goodbye to you with regret. 😭
          <br /> Logging out ...👋
        </p>
      </div>
    </div>
  );
}
