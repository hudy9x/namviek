// import RootPage from "../components/RootPage";

import { redirect } from 'next/navigation'

export default async function Index() {
  console.log('redirecting')
  redirect('/organization')
}
