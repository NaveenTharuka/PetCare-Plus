"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../../public/Logo.png";

export default function NavBar() {
  const router = useRouter();

  return (
    <header className="bg-[#fbf9f7]/80 backdrop-blur-md fixed top-0 w-full z-50">
      <nav className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto font-headline tracking-tight">
        {/* Logo */}
        <div
          className="flex flex-row items-center text-2xl font-bold text-[#313331] dark:text-[#3a3a3a] cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Image src={Logo} alt="Logo" width={50} height={50} priority />
          PetCare+
        </div>

        {/* Desktop Navigation Links - Fixed with Link components */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Pets', path: '/pets' },
            { name: 'Services', path: '/services' },
            { name: 'Store', path: '/store' }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-[#414140] dark:text-stone-400 hover:text-[#5d4137] transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          <button
            aria-label="Notifications"
            className="text-[#7b5749] hover:opacity-80 transition-all cursor-pointer"
            onClick={() => router.push('/notifications')}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              notifications
            </span>
          </button>

          <button
            aria-label="Account"
            className="text-[#7b5749] hover:opacity-80 transition-all cursor-pointer"
            onClick={() => router.push('/login')}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              account_circle
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}