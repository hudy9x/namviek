'use client';

import Link from 'next/link';
import { RiBarChartFill, RiCalendarFill, RiDashboardFill, RiHomeFill } from 'react-icons/ri';
import { IoIosPlayCircle, IoMdLogOut } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function RootSidebar() {
  const { push } = useRouter();
  return (
    <nav className="primary-sidebar">
      <section>
        <Link href="/home">
          <RiHomeFill className="main-nav-icon" />
        </Link>
        <Link href="/home">
          <RiDashboardFill className="main-nav-icon active" />
        </Link>
        <Link href="/home">
          <RiCalendarFill className="main-nav-icon" />
        </Link>
        <Link href="/home">
          <RiBarChartFill className="main-nav-icon" />
        </Link>
        <Link href="/home">
          <IoIosPlayCircle className="main-nav-icon" />
        </Link>
      </section>
      <section>
        <Link href="/sign-out">
          <IoMdLogOut className="main-nav-icon" />
        </Link>
      </section>
    </nav>
  );
}
