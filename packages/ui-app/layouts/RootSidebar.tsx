'use client'

import Link from 'next/link'
import { IoMdLogOut } from 'react-icons/io'
import Image from 'next/image'
import { HiOutlineUserPlus } from 'react-icons/hi2'
import { FcBriefcase, FcOrganization, FcVideoCall } from 'react-icons/fc'
import { Tooltip } from '@shared/ui'
import ThemeSelection from './ThemeSelection'
import { useOrganizationBySlug } from '@/hooks/useOrganizationBySlug'

export default function RootSidebar() {
  const { slug } = useOrganizationBySlug()

  return (
    <nav className="primary-sidebar">
      <section>
        <Link href={`/${slug}/my-works`}>
          <div className="flex justify-center pt-3">
            <Image
              src={'/logo132x132.svg'}
              width={30}
              height={30}
              alt="Homepage"
            />
          </div>
        </Link>

        <Link href="/organization">
          <Tooltip title="Organization" side="right">
            <div>
              <FcOrganization className="main-nav-icon" />
            </div>
          </Tooltip>
        </Link>

        <Link href={`/${slug}/my-works`}>
          <Tooltip title="Project" side="right">
            <div>
              <FcBriefcase className="main-nav-icon active" />
            </div>
          </Tooltip>
        </Link>

        <Link href={`/${slug}/meeting`}>
          <Tooltip title="Meeting" side="right">
            <div>
              <FcVideoCall className="main-nav-icon" />
            </div>
          </Tooltip>
        </Link>
      </section>
      <section>
        <ThemeSelection />
        <Link href={`/${slug}/setting/people`}>
          <HiOutlineUserPlus className="main-nav-icon" />
        </Link>
        <Link href="/sign-out">
          <IoMdLogOut className="main-nav-icon" />
        </Link>
      </section>
    </nav>
  )
}
