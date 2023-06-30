'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { orgGet } from '../services/organization';

export default function RootPage() {
  const { push } = useRouter();
  console.log('root page');
  useEffect(() => {
    orgGet().then(res => {
      const { data, status } = res.data;
      if (status !== 200) {
        return;
      }

      // if use have no organization
      if (!data) {
        push('/organization/create')
        return;
      }

      console.log(data);
    });

    // login -> redirect to /
    // if not create org, redirec to /org
    // after create org, redirect to org dashboard
    // save selected project
    //
    // next time login
    // if has selected project, redirect to it
    //
    // if other user login
    // delete all cached,

    console.log('098098');
  }, []);

  return <div></div>;
}
