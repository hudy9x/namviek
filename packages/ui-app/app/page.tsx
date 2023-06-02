import { UserButton } from '@clerk/nextjs';
import styles from './page.module.css';
import TestBtn from '../components/TestBtn';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={styles.page}>
      <div className="wrapper">
				<UserButton afterSignOutUrl='/sign-in'/>
				<TestBtn/>
      </div>
    </div>
  );
}
