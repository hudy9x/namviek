import Link from "next/link";
import SignupForm from "./SignupForm";
import { HiOutlineArrowLeft, HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function Page() {
  if (process.env.NEXT_PUBLIC_DISABLE_REGISTRATION === "1") {
    return <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-center space-y-3 w-[500px] px-3">
        <HiOutlineExclamationTriangle className="inline-block w-14 h-14 rounded-full bg-yellow-300/40 p-3 text-yellow-600 border border-yellow-300 shadow-xl shadow-yellow-200" />
        <h2 className=" text-gray-800 font-medium pt-4">Registration is disabled</h2>
        <p className="text-gray-500 text-sm">This functionality is currently unavailable. Please contact the website administrator for further assistance.</p>
        <p className="text-gray-400 text-sm flex items-center gap-2 justify-center">
          <HiOutlineArrowLeft />
          <Link href={"/sign-in"} className="text-gray-400 hover:text-indigo-500 hover:underline">
            Go back to login</Link>
        </p>

      </div>
    </div>
  }
  return <SignupForm />
}
