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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
        sidebarOpen={sidebarOpen}
        onLogout={handleLogout}
      />
      <div className="pt-20">
        <div className="max-w-screen-2xl mx-auto w-full">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="ml-72 h-[calc(100vh-80px)] overflow-auto p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
