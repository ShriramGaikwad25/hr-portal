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
  managerId: string | null;
  managerName: string | null;
  hireDate: string;
  terminationDate: string | null;
  createdAt: string;
  updatedAt: string;
};

function mapApiToUserRow(emp: ApiEmployee): UserRow {
  return {
    firstName: emp.firstName,
    lastName: emp.lastName,
    department: emp.department,
    email: emp.email,
    status: emp.status === "ACTIVE" ? "Active" : "Inactive",
    jobTitle: emp.title,
    employeeId: emp.employeeId,
    managerId: emp.managerId ?? undefined,
    managerName: emp.managerName ?? undefined,
  };
}

export default function ManageUserPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<UserRow | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  function openDelete(row: UserRow) {
    setDeleteError(null);
    setDeleteConfirm(row);
  }

  async function confirmDelete() {
    if (!deleteConfirm) return;
    setDeleteError(null);
    setDeleteLoading(true);
    try {
      if (deleteConfirm.employeeId) {
        const res = await fetch(`/api/employees/${deleteConfirm.employeeId}`, {
          method: "DELETE",
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setDeleteError((data as { error?: string }).error || "Failed to delete employee");
          return;
        }
      }
      setUsers((prev) =>
        prev.filter((u) => {
          if (deleteConfirm.employeeId && u.employeeId === deleteConfirm.employeeId) return false;
          if (
            u.email === deleteConfirm.email &&
            u.firstName === deleteConfirm.firstName &&
            u.lastName === deleteConfirm.lastName
          )
            return false;
          return true;
        })
      );
      setDeleteConfirm(null);
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "Failed to delete employee");
    } finally {
      setDeleteLoading(false);
    }
  }

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
        {loading && (
          <p className="text-slate-600 dark:text-slate-400">Loading employees…</p>
        )}
        {error && (
          <p className="text-red-600 dark:text-red-400">{error}</p>
        )}
        {!loading && !error && (
          <UsersGrid rowData={users} onEdit={openEdit} onDelete={openDelete} />
        )}
      </div>

      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800">
            <h3 id="delete-dialog-title" className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Delete user?
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {deleteConfirm.firstName} {deleteConfirm.lastName}
              </span>
              ? This action cannot be undone.
            </p>
            {deleteError && (
              <p className="mt-3 text-sm text-red-600 dark:text-red-400">{deleteError}</p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => {
                  setDeleteError(null);
                  setDeleteConfirm(null);
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteLoading}
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-slate-800"
              >
                {deleteLoading ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
