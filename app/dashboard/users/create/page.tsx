"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { UserRow } from "../UsersGrid";

const NEW_USER_KEY = "hr-portal-new-user";

const defaultForm: UserRow = {
  firstName: "",
  lastName: "",
  department: "",
  email: "",
  status: "Active",
  jobTitle: "",
};

export default function CreateUserPage() {
  const router = useRouter();
  const [form, setForm] = useState<UserRow>(defaultForm);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem(NEW_USER_KEY, JSON.stringify(form));
    router.push("/dashboard/users");
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-[#0045ff] focus:outline-none focus:ring-1 focus:ring-[#0045ff] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";
  const labelClass = "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-12">
      <div className="w-full">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Create User
        </h2>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                className={inputClass}
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={form.lastName}
                onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                className={inputClass}
                placeholder="Last name"
              />
            </div>
            <div>
              <label htmlFor="department" className={labelClass}>
                Department
              </label>
              <input
                id="department"
                type="text"
                required
                value={form.department}
                onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
                className={inputClass}
                placeholder="Department"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className={inputClass}
                placeholder="email@company.com"
              />
            </div>
            <div>
              <label htmlFor="status" className={labelClass}>
                Status
              </label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                className={inputClass}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label htmlFor="jobTitle" className={labelClass}>
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                required
                value={form.jobTitle}
                onChange={(e) => setForm((p) => ({ ...p, jobTitle: e.target.value }))}
                className={inputClass}
                placeholder="Job title"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <Link
              href="/dashboard/users"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-[#0045ff] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
