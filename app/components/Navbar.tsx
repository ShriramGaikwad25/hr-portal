"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavbarProps = {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onLogout?: () => void;
};

export function Navbar({ onToggleSidebar, sidebarOpen, onLogout }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUserId(sessionStorage.getItem("hr-portal-user") ?? "");
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const initial = userId ? userId.charAt(0).toUpperCase() : "?";

  return (
    <header
      className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/20 px-4"
      style={{ backgroundColor: "rgb(39, 185, 115)" }}
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/20"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link
          href="/dashboard"
          className="text-lg font-semibold text-white"
        >
          HR Portal
        </Link>
      </div>

      <div className="relative mr-10" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[rgb(39,185,115)]"
          style={{ color: "rgb(39, 185, 115)" }}
          aria-label="Profile menu"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          {initial}
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 top-full z-10 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="border-b border-slate-200 px-4 py-2 dark:border-slate-700">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                {userId || "User"}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                Profile
              </p>
            </div>
            {onLogout && (
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
