"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserRow } from "../UsersGrid";

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
};

type CreateForm = UserRow & { managerId: string };

const defaultForm: CreateForm = {
  firstName: "",
  lastName: "",
  department: "",
  email: "",
  status: "Active",
  jobTitle: "",
  managerId: "",
};

export default function CreateUserPage() {
  const router = useRouter();
  const [form, setForm] = useState<CreateForm>(defaultForm);
  const [managers, setManagers] = useState<ApiEmployee[]>([]);
  const [managersLoading, setManagersLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(EMPLOYEES_API);
        if (!res.ok) return;
        const data = (await res.json()) as ApiEmployee[];
        if (!cancelled) setManagers(data);
      } finally {
        if (!cancelled) setManagersLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const editStored = sessionStorage.getItem(EDIT_USER_KEY);
    if (editStored) {
      try {
        const editRow = JSON.parse(editStored) as UserRow;
        setForm({
          ...editRow,
          managerId: editRow.managerId ?? "",
        });
        setIsEditMode(true);
      } catch {
        // ignore
      }
    } else {
      setForm(defaultForm);
      setIsEditMode(false);
    }
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEditMode && form.employeeId) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const payload = {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          department: form.department,
          title: form.jobTitle,
          status: form.status.toUpperCase(),
          managerId: form.managerId || null,
        };
        const res = await fetch(`/api/employees/${form.employeeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error || `Update failed: ${res.status}`);
        }
        const manager = form.managerId
          ? managers.find((emp) => emp.employeeId === form.managerId)
          : null;
        const updated: UserRow = {
          ...form,
          managerId: form.managerId || undefined,
          managerName: manager
            ? `${manager.firstName} ${manager.lastName}`
            : undefined,
        };
        sessionStorage.setItem(UPDATED_USER_KEY, JSON.stringify(updated));
        sessionStorage.removeItem(EDIT_USER_KEY);
        router.push("/dashboard/users");
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "Update failed");
      } finally {
        setSubmitting(false);
      }
    } else if (isEditMode) {
      const { managerId, ...userRow } = form;
      const manager = managerId
        ? managers.find((emp) => emp.employeeId === managerId)
        : null;
      const updated: UserRow = {
        ...userRow,
        managerId: managerId || undefined,
        managerName: manager
          ? `${manager.firstName} ${manager.lastName}`
          : undefined,
      };
      sessionStorage.setItem(UPDATED_USER_KEY, JSON.stringify(updated));
      sessionStorage.removeItem(EDIT_USER_KEY);
      router.push("/dashboard/users");
    } else {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const employeeNumber = "E" + Date.now().toString().slice(-6);
        const payload = {
          employeeNumber,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          department: form.department,
          title: form.jobTitle,
          status: form.status.toUpperCase(),
          managerId: form.managerId || null,
        };
        const res = await fetch(EMPLOYEES_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error || `Create failed: ${res.status}`);
        }
        router.push("/dashboard/users");
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "Create failed");
      } finally {
        setSubmitting(false);
      }
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-[#0045ff] focus:outline-none focus:ring-1 focus:ring-[#0045ff] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";
  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

  const editingEmployeeId = isEditMode ? form.employeeId : undefined;

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-12">
      <div className="w-full">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {isEditMode ? "Edit User" : "Create User"}
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
                onChange={(e) =>
                  setForm((p) => ({ ...p, firstName: e.target.value }))
                }
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
                onChange={(e) =>
                  setForm((p) => ({ ...p, lastName: e.target.value }))
                }
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
                onChange={(e) =>
                  setForm((p) => ({ ...p, department: e.target.value }))
                }
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
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
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
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
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
                onChange={(e) =>
                  setForm((p) => ({ ...p, jobTitle: e.target.value }))
                }
                className={inputClass}
                placeholder="Job title"
              />
            </div>
            <div>
              <label htmlFor="manager" className={labelClass}>
                Manager
              </label>
              <select
                id="manager"
                value={form.managerId}
                onChange={(e) =>
                  setForm((p) => ({ ...p, managerId: e.target.value }))
                }
                className={inputClass}
                disabled={managersLoading}
              >
                <option value=""></option>
                {managers
                  .filter(
                    (emp) => emp.employeeId !== editingEmployeeId
                  )
                  .map((emp) => (
                    <option key={emp.employeeId} value={emp.employeeId}>
                      {emp.firstName} {emp.lastName}
                      {emp.employeeNumber ? ` (${emp.employeeNumber})` : ""}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {submitError && (
            <p className="mt-4 text-red-600 dark:text-red-400">{submitError}</p>
          )}
          <div className="flex justify-end gap-3 pt-6">
            <Link
              href="/dashboard/users"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-[#0045ff] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
            >
              {submitting
              ? isEditMode
                ? "Updating…"
                : "Creating…"
              : isEditMode
                ? "Update"
                : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
