"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(sessionStorage.getItem("hr-portal-user"));
  }, []);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Dashboard
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Welcome back,{" "}
          <span className="font-medium text-slate-800 dark:text-slate-200">
            {userId ?? "User"}
          </span>
          . Here you can manage employees, leave requests, and company resources.
        </p>
      </section>
    </div>
  );
}
