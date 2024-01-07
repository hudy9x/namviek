'use client'

import SettingStorageConfiguration from "./SettingStorageConfiguration"
import SettingAbout from "./SettingAbout"
import './style.css'
import { useState } from "react"
import { HiOutlineFolderOpen, HiOutlineNewspaper, HiOutlineSquare3Stack3D } from "react-icons/hi2"

export default function SettingAboutContent() {
  const [active, setActive] = useState(0)
  const asides = [
    {
      title: "Information",
      icon: HiOutlineNewspaper,
      content: SettingAbout,
      desc: "Share as much information about your organization as you'd like, or stick with the essentials and utilize our streamlined default settings."
    },
    {
      title: "Storage configuration",
      icon: HiOutlineFolderOpen,
      content: SettingStorageConfiguration,
      desc: "Choose between your own cloud storage (AWS S3 or DigitalOcean) for unlimited capacity or utilize our default storage with a fixed limit."
    },
  ]

  const Content = asides[active].content

  return <div className="pt-12 w-[900px] ml-12">
    <div className="org">
      <div className="aside-content">
        <aside className="aside-menu">
          {asides.map((aside, aIndex) => {
            const isActive = aIndex === active ? 'active' : ''
            const Icon = aside.icon
            return <section key={aIndex}
              onClick={() => setActive(aIndex)}
              className={`${isActive}`}>
              <h2>
                <Icon />
                {aside.title}</h2>
              <p>{aside.desc}</p>
            </section>
          })}
        </aside>
        <main className="w-full">
          <Content />
        </main>
      </div>
    </div>
  </div>
}

