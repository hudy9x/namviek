'use client'

import Link from 'next/link'
import { RiBarChartFill, RiCalendarFill, RiDashboardFill } from 'react-icons/ri'
import { IoIosPlayCircle, IoMdLogOut } from 'react-icons/io'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { HiOutlineUserPlus } from 'react-icons/hi2'
import { LiaCitySolid } from 'react-icons/lia'
import { FcOrganization, FcVideoCall } from 'react-icons/fc'

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
        <Link href={`/${orgID}/my-works`}>
          <RiDashboardFill className="main-nav-icon active" />
        </Link>
        <Link href="/organization">
          <FcOrganization className="main-nav-icon" />
          {/* <LiaCitySolid className="main-nav-icon" /> */}
        </Link>
        <Link href={`/${orgID}/meeting`}>
          <FcVideoCall className="main-nav-icon" />
          {/* <RiBarChartFill className="main-nav-icon" /> */}
        </Link>
        <Link href="/home">
          <IoIosPlayCircle className="main-nav-icon" />
        </Link>
      </section>
      <section>
        <Link href={`/${orgID}/setting/people`}>
          <HiOutlineUserPlus className="main-nav-icon" />
        </Link>
        <Link href="/sign-out">
          <IoMdLogOut className="main-nav-icon" />
        </Link>
      </section>
    </nav>
  )
}
