import Link from "next/link";
import { useEffect, useState } from "react";
import { IoRocketOutline } from "react-icons/io5";

function UpsaleDialog() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const hasSeenDialog = localStorage.getItem('hasSeenUpsaleDialog');
    if (!hasSeenDialog) {
      // Set up 30-second timer for first-time visitors
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 30000);

      // Cleanup timer if component unmounts or user clicks rocket
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    // Wait for animation to finish before hiding
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
    localStorage.setItem('hasSeenUpsaleDialog', 'true');
  };

  const handleShow = () => {
    setIsVisible(true);
    // Trigger animation after a brief delay to ensure visibility
    setTimeout(() => {
      setIsAnimating(true);
    }, 50);
  };

  return isVisible ? (
    <div 
      className={`w-[350px] fixed z-[9999] bottom-8 right-8 p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-900 border dark:border-zinc-700 transition-all duration-300 ease-in-out ${
        isAnimating 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative">
        <h2 className="font-medium mb-2">Start Self-Hosting Now!</h2>
        <p className="text-sm text-zinc-500 mb-4">You've tried it, now make it yours! Deploy your instance of our open-source management tool today.</p>

        <img className="rounded-lg border border-zinc-100/10" src="/dialog-background.png" />

        <div 
          onClick={handleClose}
          className="absolute top-0 right-0 text-sm w-6 h-6 rounded-md bg-gray-100 dark:bg-zinc-700 dark:text-zinc-200 text-center leading-[24px] cursor-pointer hover:bg-gray-200"
        >
          ✕
        </div>
        <div className="pt-4">
          <button className="rounded-lg px-3 py-2 bg-indigo-600 text-white text-sm hover:bg-indigo-700 cursor-pointer">
            <Link href={'https://docs.namviek.com/visual'} target="_blank">
              Deploy now
            </Link>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div 
      onClick={handleShow}
      className="fixed z-[9999] bottom-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <IoRocketOutline size={24} />
    </div>
  );
}

export default function Upsale() {
  const enabled = process.env.NEXT_PUBLIC_UPSALE;
  if (enabled !== 'true' && enabled !== '1') {
    return null;
  }

  return <UpsaleDialog />;
}
