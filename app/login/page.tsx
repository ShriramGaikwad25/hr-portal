"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem("hr-portal-user", userId);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left panel - blue */}
      <div className="hidden lg:flex lg:w-[40%] relative bg-[#0045ff] overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
          }}
        />
        <div className="absolute bottom-8 left-8 text-white/30 text-6xl font-bold select-none">
          H
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12 min-h-screen">
        <div className="w-full max-w-sm">
          {/* Logo / brand */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-[#0045ff] flex items-center justify-center shadow-lg mb-3">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold text-slate-800">HR Portal</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Log In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                User ID<span className="text-red-500">*</span>
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                autoComplete="username"
                placeholder="Insert your User ID"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 placeholder:italic focus:border-[#0045ff] focus:outline-none focus:ring-1 focus:ring-[#0045ff]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Insert your password"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 placeholder:italic focus:border-[#0045ff] focus:outline-none focus:ring-1 focus:ring-[#0045ff]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#0045ff] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0039d9]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#0045ff] font-medium underline hover:text-[#0039d9]"
            >
              Register with SSO
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
