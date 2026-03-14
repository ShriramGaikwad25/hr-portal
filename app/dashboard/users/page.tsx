"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UsersGrid, type UserRow } from "./UsersGrid";

const NEW_USER_KEY = "hr-portal-new-user";

const initialUsers: UserRow[] = [
  {
    firstName: "John",
    lastName: "Doe",
    department: "Engineering",
    email: "john.doe@company.com",
    status: "Active",
    jobTitle: "Software Engineer",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    department: "Human Resources",
    email: "jane.smith@company.com",
    status: "Active",
    jobTitle: "HR Manager",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    department: "Sales",
    email: "mike.johnson@company.com",
    status: "Inactive",
    jobTitle: "Sales Representative",
  },
];

export default function ManageUserPage() {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);

  useEffect(() => {
    const stored = sessionStorage.getItem(NEW_USER_KEY);
    if (stored) {
      try {
        const newUser = JSON.parse(stored) as UserRow;
        setUsers((prev) => [...prev, newUser]);
      } finally {
        sessionStorage.removeItem(NEW_USER_KEY);
      }
    }
  }, []);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Manage User
        </h2>
        <Link
          href="/dashboard/users/create"
          className="rounded-lg bg-[#0045ff] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0045ff] focus:ring-offset-2 dark:focus:ring-offset-slate-950"
        >
          Create
        </Link>
      </div>

      <div className="mt-8">
        <UsersGrid rowData={users} />
      </div>
    </div>
  );
}
