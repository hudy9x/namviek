import { Button } from "@ui-components";
import Link from "next/link";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import './index.css'

export default function IntroSection() {

  return <div className="intro-section overflow-hidden pt-14 w-full shrink-0 dark:bg-gray-900 px-32 flex flex-col">

    <h2 className='mt-[95px] text-[42px] font-extrabold leading-tight text-white sign-text-shadow'>Saving up to 90% on <br />operational costs</h2>

    <p className="text-[19px] mt-6 text-[#CCE1FB] sign-text-shadow">Switch to our free, open-source solution and <br />slash your project management expenses immediately.</p>

    <img src="/sign-background-cover1.png" className="w-[1100px] mt-7 -ml-[60px]" style={{ maxWidth: 'initial' }} />

    <div className="flex items-center gap-2">
      <Link href={'https://docs.namviek.com/visual'} target="_blank">
        <Button ghost leadingIcon={<HiOutlineRocketLaunch />} size="md" title="Deploy it now" />
      </Link>
      <Link href={'https://github.com/hudy9x/namviek'} target="_blank">
        <Button ghost leadingIcon={<FaGithub />} size="md" title="Give me a star" />
      </Link>
    </div>

    <div>

    </div>
  </div>
}
