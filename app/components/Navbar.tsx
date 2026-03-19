"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type NavbarProps = {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onLogout?: () => void;
};

export function Navbar({ onToggleSidebar, sidebarOpen, onLogout }: NavbarProps) {
  const [userId, setUserId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setUserId(sessionStorage.getItem("hr-portal-user") ?? "");
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-indigo-700 text-white shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/Paycom_logo.svg"
            alt="Paycom"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
          <span className="text-2xl font-semibold tracking-tight">HR Portal</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Quick search..."
              className="bg-white/10 text-white placeholder:text-white/60 w-80 pl-10 py-3 rounded-3xl text-sm focus:outline-none"
            />
            <span className="absolute left-4 top-3.5 text-white/70 text-xs">🔍</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                // simple demo behaviour
                alert("Notifications (demo)");
              }}
              className="text-xl cursor-pointer"
            >
              🔔
            </button>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-2xl border-2 border-white bg-white/10 flex items-center justify-center text-sm font-semibold">
                  {userId ? userId.charAt(0).toUpperCase() : "L"}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Lisa Kim</p>
                  <p className="text-[10px] opacity-75 -mt-0.5">HR Administrator</p>
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md bg-white text-slate-800 shadow-lg py-1 text-sm">
                  <button
                    type="button"
                    className="block w-full px-3 py-2 text-left hover:bg-slate-100"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout?.();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
