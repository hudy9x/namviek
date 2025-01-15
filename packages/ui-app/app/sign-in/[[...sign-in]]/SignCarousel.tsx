import { Button } from "@shared/ui";
import Link from "next/link";

{/* https://dribbble.com/shots/24565993-Create-account-Untitled-UI */ }
export default function SignCarousel() {

  return <div className="sign-carousel pt-14 w-full shrink-0 border-l dark:bg-gray-900 px-32 flex flex-col">

    <h2 className='mt-[95px] text-[42px] font-extrabold leading-tight text-white sign-text-shadow'>Saving up to 90% on <br/>operational costs</h2>

    <p className="text-[19px] mt-6 text-[#CCE1FB] sign-text-shadow">It’s a free open-source project management tool<br /> for teams of 15 members</p>

    <img src="/sign-background-cover1.png" className="w-[1100px] mt-7 -ml-[60px]" style={{ maxWidth: 'initial' }} />

    <div>
      <Link href={'https://docs.namviek.com/visual'} target="_blank">
        <Button size="md"  title="Deploy it now" />
      </Link>
    </div>

    <div>

    </div>
  </div>
}
