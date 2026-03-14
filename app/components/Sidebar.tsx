"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/dashboard/users", label: "Manage User", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
];

type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white transition-[width] duration-200 ease-out dark:border-slate-800 dark:bg-slate-900 ${
        isOpen ? "w-56" : "w-16"
      }`}
      style={{ height: "calc(100vh - 3.5rem)", minHeight: "calc(100vh - 3.5rem)" }}
      aria-hidden={false}
    >
      <div className={`flex flex-1 flex-col min-h-0 ${isOpen ? "min-w-56" : "min-w-16"}`}>
        <nav className="flex-1 space-y-0.5 overflow-y-auto pt-4 pb-4 flex flex-col items-stretch">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                title={!isOpen ? link.label : undefined}
                className={`flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors ${
                  isOpen ? "gap-3 px-4" : "justify-center px-0"
                } ${
                  isActive
                    ? "bg-[#0045ff]/10 text-[#0045ff] dark:bg-[#0045ff]/20 dark:text-[#5b8aff]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                }`}
              >
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={link.icon}
                  />
                </svg>
                {isOpen && (
                  <span className="truncate">{link.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
