'use client'

import { useDebounce } from "@/hooks/useDebounce"
import { orgGetById } from "@/services/organization"
import { useOrgMemberStore } from "@/store/orgMember"
import { Organization } from "@prisma/client"
import { getLocalCache, setLocalCache } from "@shared/libs"
import { Loading, Popover, Tooltip } from "@shared/ui"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { AiOutlineCloudDownload } from "react-icons/ai"
import { HiOutlineCog6Tooth, HiOutlineInformationCircle, HiOutlineUserPlus } from "react-icons/hi2"

export const setOrgInfo = ({ name, cover }: { name: string, cover: string }) => {
  name && setLocalCache('ORG_NAME', name)
  cover && setLocalCache('ORG_COVER', cover)
}

const getOrgInfo = () => {
  const name = getLocalCache('ORG_NAME') || ''
  const cover = getLocalCache('ORG_COVER') || ''

  return { name, cover }
}

function OrgInfo({ id }: { id: string }) {
  const { name, cover } = getOrgInfo()
  const { orgMembers } = useOrgMemberStore()
  const [org, setOrg] = useState({ cover, name })

  console.log('org', org)
  const len = orgMembers.length

  useDebounce(() => {
    orgGetById(id).then(res => {
      const { data } = res.data
      const { name, cover } = data as Organization

      setOrgInfo({
        name,
        cover: cover || ''
      })

      setOrg({
        name,
        cover: cover || ''
      })
    })
  }, [id])

  return <div className="flex items-center gap-2">
    <div className="w-9 h-9 p-1 rounded-md border bg-zinc-100 dark:bg-gray-800 dark:border-gray-700 relative">
      {org.cover ?
        <img className="w-full h-full" src={org.cover} /> : <Loading.Absolute title="" />}
    </div>
    <div className="flex flex-col">
      <span className="text-gray-700 dark:text-gray-400 text-sm">{org.name ? org.name : <span className="h-2 bg-slate-700 rounded animate-pulse text-transparent">No title</span>}</span>
      <span className="text-xs text-gray-400 dark:text-gray-500">There {len > 2 ? "are" : 'is'} {len} members</span>
    </div>
  </div>
}

function OrgPopMenu({ id }: { id: string }) {

  const menus = [
    {
      icon: HiOutlineUserPlus,
      link: `/${id}/setting/people`,
      title: 'Members'
    },
    {
      icon: AiOutlineCloudDownload,
      link: `/${id}/setting/export-import`,
      title: 'Export'
    },
    {
      icon: HiOutlineInformationCircle,
      link: `/${id}/setting/about`,
      title: 'About'
    }
  ]

  return <div>
    <Popover
      triggerBy={<div className="w-7 h-7 rounded-md p-1 cursor-pointer border dark:border-gray-700 hover:bg-zinc-100 dark:hover:bg-gray-800 flex items-center justify-center">
        <HiOutlineCog6Tooth className="text-gray-500" />
      </div>}
      content={<div className="border rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm py-1.5 w-[150px] mt-1">
        {menus.map(menu => {
          const Icon = menu.icon
          return <Link href={menu.link} className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Icon className="text-gray-500 dark:text-gray-400 w-4 h-4" />
            <span className="text-xs text-gray-700 dark:text-gray-500">{menu.title}</span>
          </Link>
        })}
      </div>}
    />
  </div>
}

export default function OrgSection() {
  const { orgID } = useParams()


  return <section className="nav-org-section border-b dark:border-gray-800 px-3 py-[21px]">
    <div className="flex items-center justify-between">
      <OrgInfo id={orgID} />
      <OrgPopMenu id={orgID} />
    </div>
  </section>
}
