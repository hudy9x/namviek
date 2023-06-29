'use client';
import { useEffect } from 'react';

export default function RootPage() {
  console.log('root page')
  useEffect(() => {
    const orgInfo = window.localStorage.getItem('ORG_INFO') || '{}';

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

    console.log('098098')
  }, []);

  return <div></div>;
}
