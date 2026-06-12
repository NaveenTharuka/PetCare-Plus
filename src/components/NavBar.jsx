"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Logo from "../../public/Logo.png";
import { useAuth } from "@/auth/AuthProvider";
import styles from "./NavBar.module.css";
import { useState, useRef, useEffect } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { loading, user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAvatarClick = () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (pathname === `/user/me`) {
      logOut();
      router.push('/');
      return;
    }

    // Toggle dropdown instead of returning JSX
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logOut();
    router.push('/');
    setIsDropdownOpen(false);
  };

  const handleAccount = () => {
    router.push('/account');
    setIsDropdownOpen(false);
  };

  const renderButtonContent = () => {
    if (!user) {
      return (
        <span className="material-symbols-outlined" aria-hidden="true">
          account_circle
        </span>
      );
    }

    if (pathname?.startsWith(`/user/me`)) {
      return (
        <span className="material-symbols-outlined" aria-hidden="true">
          logout
        </span>
      );
    }

    return (
      <img
        src={user.image_url}
        className="rounded-full w-6 h-6 border border-[#7b5749] object-cover"
        alt="User avatar"
      />
    );
  };

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

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { name: 'Dashboard', path: '/user/me' },
            { name: 'Pets', path: '/user/1/pets' },
            { name: 'Services', path: '/services' },
            { name: 'Store', path: '#' }
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
        <div className="flex items-center gap-6" ref={dropdownRef}>
          <button
            aria-label="Notifications"
            className="text-[#7b5749] hover:opacity-80 transition-all cursor-pointer"
            onClick={() => router.push('/notifications')}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              notifications
            </span>
          </button>

          <div className="relative">
            {loading ? (
              <button
                aria-label="Account"
                className="text-[#7b5749] hover:opacity-80 transition-all cursor-pointer"
                disabled={loading}
              >
                <span className="material-symbols-outlined" aria-hidden="true">account_circle</span>
              </button>
            ) : (
              <button
                aria-label="Account"
                className="text-[#7b5749] hover:opacity-80 transition-all cursor-pointer"
                onClick={handleAvatarClick}
              >
                {renderButtonContent()}
              </button>
            )}

            {/* Dropdown Menu */}
            {isDropdownOpen && user && !pathname?.startsWith('/user/me') && (
              <ul className={styles.dropdown}>
                <li>
                  <button onClick={handleAccount} className={styles.dropdownItem}>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      account_circle
                    </span>
                    Account
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.dropdownItem}>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      logout
                    </span>
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}