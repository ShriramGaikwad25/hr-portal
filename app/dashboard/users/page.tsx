"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { UsersGrid, type UserRow } from "./UsersGrid";

const NEW_USER_KEY = "hr-portal-new-user";
const EDIT_USER_KEY = "hr-portal-edit-user";
const UPDATED_USER_KEY = "hr-portal-updated-user";
const EMPLOYEES_API = "/api/employees";

type ApiEmployee = {
  employeeId: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;
  status: string;
  username?: string;
  managerId?: string | null;
  managerName?: string | null;
};

function mapApiToUserRow(emp: ApiEmployee): UserRow {
  const statusUpper = (emp.status ?? "").toUpperCase();
  const statusDisplay =
    statusUpper === "ACTIVE"
      ? "Active"
      : statusUpper === "TERMINATED"
        ? "Terminated"
        : statusUpper === "INACTIVE"
          ? "Inactive"
          : emp.status ?? "Inactive";
  return {
    firstName: emp.firstName,
    lastName: emp.lastName,
    department: emp.department,
    email: emp.email,
    status: statusDisplay,
    jobTitle: emp.title,
    employeeId: emp.employeeId,
    username: emp.username,
    managerId: emp.managerId ?? undefined,
    managerName: emp.managerName ?? undefined,
  };
}

export default function ManageUserPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(EMPLOYEES_API);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = (await res.json()) as ApiEmployee[];
      let list = data.map(mapApiToUserRow);

      const newUserStored = sessionStorage.getItem(NEW_USER_KEY);
      if (newUserStored) {
        try {
          const newUser = JSON.parse(newUserStored) as UserRow;
          list = [...list, newUser];
        } finally {
          sessionStorage.removeItem(NEW_USER_KEY);
        }
      }

      const updatedStored = sessionStorage.getItem(UPDATED_USER_KEY);
      if (updatedStored) {
        try {
          const updated = JSON.parse(updatedStored) as UserRow;
          list = list.map((u) => {
            if (updated.employeeId && u.employeeId === updated.employeeId)
              return updated;
            if (
              !updated.employeeId &&
              u.email === updated.email &&
              u.firstName === updated.firstName &&
              u.lastName === updated.lastName
            )
              return updated;
            return u;
          });
        } finally {
          sessionStorage.removeItem(UPDATED_USER_KEY);
        }
      }

      setUsers(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load employees");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  function openEdit(row: UserRow) {
    sessionStorage.setItem(EDIT_USER_KEY, JSON.stringify(row));
    router.push("/dashboard/users/create");
  }

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Manage Employee
        </h2>
        <Link
          href="/dashboard/users/create"
          className="rounded-lg bg-[#0045ff] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0045ff] focus:ring-offset-2 dark:focus:ring-offset-slate-950"
        >
          Create
        </Link>
      </div>

      <div className="mt-8">
        {loading && (
          <p className="text-slate-600 dark:text-slate-400">Loading employees…</p>
        )}
        {error && (
          <p className="text-red-600 dark:text-red-400">{error}</p>
        )}
        {!loading && !error && (
          <UsersGrid rowData={users} onEdit={openEdit} />
        )}
      </div>
    </div>
  );
}
