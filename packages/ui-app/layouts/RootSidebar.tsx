'use client'

import Link from 'next/link'
import { RiBarChartFill, RiCalendarFill, RiDashboardFill } from 'react-icons/ri'
import { IoIosPlayCircle, IoMdLogOut } from 'react-icons/io'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RootSidebar() {
  const { orgID } = useParams()

  return (
    <nav className="primary-sidebar">
      <section>
        <Link href={`/${orgID}/my-works`}>
          <div className="flex justify-center pt-3">
            <Image
              src={'/logo132x132.svg'}
              width={35}
              height={35}
              alt="Homepage"
            />
          </div>
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
  )
}
