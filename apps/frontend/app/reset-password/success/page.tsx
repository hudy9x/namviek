'use client'

import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineCheckCircle } from "react-icons/hi2";
import { Button } from "@ui-components";

export default function SuccessPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-center space-y-3 w-[500px] px-3">
        <HiOutlineCheckCircle className="inline-block w-14 h-14 rounded-full bg-green-300/40 p-3 text-green-600 border border-green-300 shadow-xl shadow-green-200" />
        <h2 className="text-gray-800 font-medium pt-4">Password Reset Successful</h2>
        <p className="text-gray-500 text-sm">Your password has been successfully reset. You can now sign in with your new password.</p>
        <div className="pt-2">
          <Link href="/sign-in">
            <Button size="md" leadingIcon={<HiOutlineArrowLeft />} title="Go to login" />
          </Link>
        </div>
      </div>
    </div>
  );
} 