"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("hr-portal-user");
    if (!user) {
      router.replace("/login");
      return;
    }
    setMounted(true);
  }, [router]);

  function handleLogout() {
    sessionStorage.removeItem("hr-portal-user");
    router.replace("/login");
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans dark:bg-slate-950">
      <Navbar
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
        sidebarOpen={sidebarOpen}
        onLogout={handleLogout}
      />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
