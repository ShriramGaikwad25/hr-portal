"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserRow } from "../UsersGrid";

const NEW_USER_KEY = "hr-portal-new-user";
const EDIT_USER_KEY = "hr-portal-edit-user";
const UPDATED_USER_KEY = "hr-portal-updated-user";
const EMPLOYEES_API = "/api/employees";

type PendingSuccess =
  | { kind: "create" }
  | { kind: "edit"; updated: UserRow };

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
  managerName?: string | null;
  username?: string;
  active?: boolean;
  firstname?: string;
  emailAddressWork?: string;
  phoneNumberWork?: string;
  phoneNumberHome?: string;
  positionTitle?: string;
  streetAddress?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  city?: string;
  continousServiceDate?: string;
  terminationDate?: string | null;
  managerID?: string;
  costCenterId?: string;
  organizationName?: string;
  workerType?: string;
  employeeID?: string;
};

type CreateForm = {
  employeeId?: string;
  username: string;
  active: boolean;
  firstname: string;
  lastName: string;
  emailAddressWork: string;
  phoneNumberWork: string;
  phoneNumberHome: string;
  positionTitle: string;
  streetAddress: string;
  state: string;
  country: string;
  postalCode: string;
  city: string;
  continousServiceDate: string;
  terminationDate: string;
  managerID: string;
  costCenterId: string;
  organizationName: string;
  workerType: string;
  employeeID: string;
  department: string;
};

type EmployeePayload = {
  username: string;
  active: boolean;
  firstname: string;
  lastName: string;
  fullName: string;
  emailAddressWork: string;
  phoneNumberWork: string;
  phoneNumberHome: string;
  positionTitle: string;
  streetAddress: string;
  state: string;
  country: string;
  postalCode: string;
  city: string;
  continousServiceDate: string;
  terminationDate: string | null;
  managerID: string;
  costCenterId: string;
  organizationName: string;
  workerType: string;
  employeeID: string;
  department: string;
  lastModifiedBy: null;
  tenantId: null;
};

const defaultForm: CreateForm = {
  username: "",
  active: true,
  firstname: "",
  lastName: "",
  emailAddressWork: "",
  phoneNumberWork: "",
  phoneNumberHome: "",
  positionTitle: "",
  streetAddress: "",
  state: "",
  country: "",
  postalCode: "",
  city: "",
  continousServiceDate: "",
  terminationDate: "",
  managerID: "",
  costCenterId: "",
  organizationName: "",
  workerType: "Employee",
  employeeID: "",
  department: "",
};

function mapEmployeeToForm(emp: ApiEmployee): CreateForm {
  return {
    employeeId: emp.employeeId,
    username: emp.username ?? "",
    active: emp.active ?? (emp.status ?? "").toUpperCase() === "ACTIVE",
    firstname: emp.firstname ?? emp.firstName ?? "",
    lastName: emp.lastName ?? "",
    emailAddressWork: emp.emailAddressWork ?? emp.email ?? "",
    phoneNumberWork: emp.phoneNumberWork ?? "",
    phoneNumberHome: emp.phoneNumberHome ?? "",
    positionTitle: emp.positionTitle ?? emp.title ?? "",
    streetAddress: emp.streetAddress ?? "",
    state: emp.state ?? "",
    country: emp.country ?? "",
    postalCode: emp.postalCode ?? "",
    city: emp.city ?? "",
    continousServiceDate: emp.continousServiceDate ?? "",
    terminationDate: emp.terminationDate ?? "",
    managerID: emp.managerID ?? emp.managerId ?? "",
    costCenterId: emp.costCenterId ?? "",
    organizationName: emp.organizationName ?? "",
    workerType: emp.workerType ?? "Employee",
    employeeID: emp.employeeID ?? emp.employeeId ?? "",
    department: emp.department ?? "",
  };
}

function toEmployeePayload(form: CreateForm): EmployeePayload {
  return {
    username: form.username,
    active: form.active,
    firstname: form.firstname,
    lastName: form.lastName,
    fullName: `${form.firstname} ${form.lastName}`.trim(),
    emailAddressWork: form.emailAddressWork,
    phoneNumberWork: form.phoneNumberWork,
    phoneNumberHome: form.phoneNumberHome,
    positionTitle: form.positionTitle,
    streetAddress: form.streetAddress,
    state: form.state,
    country: form.country,
    postalCode: form.postalCode,
    city: form.city,
    continousServiceDate: form.continousServiceDate,
    terminationDate: form.terminationDate || null,
    managerID: form.managerID,
    costCenterId: form.costCenterId,
    organizationName: form.organizationName,
    workerType: form.workerType,
    employeeID: form.employeeID,
    department: form.department,
    lastModifiedBy: null,
    tenantId: null,
  };
}

export default function CreateUserPage() {
  const router = useRouter();
  const [form, setForm] = useState<CreateForm>(defaultForm);
  const [managers, setManagers] = useState<ApiEmployee[]>([]);
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
        // no-op
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
        const fullEmployee = managers.find(
          (emp) =>
            String(emp.employeeId ?? "") === String(editRow.employeeId ?? "") ||
            (!!editRow.username && emp.username === editRow.username)
        );
        if (fullEmployee) {
          setForm(mapEmployeeToForm(fullEmployee));
          setIsEditMode(true);
          return;
        }
        setForm({
          employeeId: editRow.employeeId,
          username: editRow.username ?? "",
          active: editRow.status.toLowerCase() === "active",
          firstname: editRow.firstName,
          lastName: editRow.lastName,
          emailAddressWork: editRow.email,
          phoneNumberWork: "",
          phoneNumberHome: "",
          positionTitle: editRow.jobTitle,
          streetAddress: "",
          state: "",
          country: "",
          postalCode: "",
          city: "",
          continousServiceDate: "",
          terminationDate: "",
          managerID: editRow.managerId ?? "",
          costCenterId: "",
          organizationName: "",
          workerType: "Employee",
          employeeID: editRow.employeeId ?? "",
          department: editRow.department,
        });
        setIsEditMode(true);
      } catch {
        // ignore
      }
    } else {
      setForm(defaultForm);
      setIsEditMode(false);
    }
  }, [managers]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingAfterSuccess, setPendingAfterSuccess] = useState<PendingSuccess | null>(null);
  const isTerminatedView = false;

  function handleSuccessModalOk() {
    if (pendingAfterSuccess?.kind === "edit") {
      sessionStorage.setItem(UPDATED_USER_KEY, JSON.stringify(pendingAfterSuccess.updated));
      sessionStorage.removeItem(EDIT_USER_KEY);
    }
    setPendingAfterSuccess(null);
    setSuccessMessage("");
    setSuccessModalOpen(false);
    router.push("/dashboard/users");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEditMode && form.employeeId) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const payload = toEmployeePayload(form);
        const res = await fetch(`/api/employees/${form.employeeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error || `Update failed: ${res.status}`);
        }
        const manager = form.managerID
          ? managers.find((emp) => emp.employeeId === form.managerID)
          : null;
        const updated: UserRow = {
          firstName: form.firstname,
          lastName: form.lastName,
          department: form.department,
          email: form.emailAddressWork,
          status: form.active ? "Active" : "Inactive",
          jobTitle: form.positionTitle,
          employeeId: form.employeeId,
          username: form.username || undefined,
          managerId: form.managerID || undefined,
          managerName: manager
            ? `${manager.firstName} ${manager.lastName}`
            : undefined,
        };
        const displayName = `${form.firstname} ${form.lastName}`.trim();
        setSuccessMessage(
          displayName
            ? `Employee "${displayName}" was updated successfully.`
            : "Employee was updated successfully."
        );
        setPendingAfterSuccess({ kind: "edit", updated });
        setSuccessModalOpen(true);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "Update failed");
      } finally {
        setSubmitting(false);
      }
    } else if (isEditMode) {
      const manager = form.managerID
        ? managers.find((emp) => emp.employeeId === form.managerID)
        : null;
      const updated: UserRow = {
        firstName: form.firstname,
        lastName: form.lastName,
        department: form.department,
        email: form.emailAddressWork,
        status: form.active ? "Active" : "Inactive",
        jobTitle: form.positionTitle,
        employeeId: form.employeeId,
        username: form.username || undefined,
        managerId: form.managerID || undefined,
        managerName: manager
          ? `${manager.firstName} ${manager.lastName}`
          : undefined,
      };
      const displayName = `${form.firstname} ${form.lastName}`.trim();
      setSuccessMessage(
        displayName
          ? `Employee "${displayName}" was updated successfully.`
          : "Employee was updated successfully."
      );
      setPendingAfterSuccess({ kind: "edit", updated });
      setSuccessModalOpen(true);
    } else {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const payload = toEmployeePayload(form);
        const res = await fetch(EMPLOYEES_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error || `Create failed: ${res.status}`);
        }
        const displayName = `${form.firstname} ${form.lastName}`.trim();
        setSuccessMessage(
          displayName
            ? `Employee "${displayName}" was created successfully.`
            : "Employee was created successfully."
        );
        setPendingAfterSuccess({ kind: "create" });
        setSuccessModalOpen(true);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "Create failed");
      } finally {
        setSubmitting(false);
      }
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-[#0045ff] focus:outline-none focus:ring-1 focus:ring-[#0045ff] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";
  const inputDisabledClass =
    inputClass + " cursor-not-allowed bg-slate-100 opacity-90 dark:bg-slate-800/80";
  const labelClass = "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <div className="px-0 py-4 lg:py-5">
      <div className="w-full">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {isEditMode ? "Edit User" : "Create User"}
          </h2>
        </div>

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
                value={form.firstname}
                onChange={(e) =>
                  setForm((p) => ({ ...p, firstname: e.target.value }))
                }
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
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
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
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
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Personal Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.emailAddressWork}
                onChange={(e) =>
                  setForm((p) => ({ ...p, emailAddressWork: e.target.value }))
                }
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="active" className={labelClass}>
                Active
              </label>
              <select
                id="active"
                value={form.active ? "true" : "false"}
                onChange={(e) =>
                  setForm((p) => ({ ...p, active: e.target.value === "true" }))
                }
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              >
                <option value="true">True</option>
                <option value="false">False</option>
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
                value={form.positionTitle}
                onChange={(e) =>
                  setForm((p) => ({ ...p, positionTitle: e.target.value }))
                }
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="employeeID" className={labelClass}>
                Employee ID
              </label>
              <input
                id="employeeID"
                type="text"
                required
                value={form.employeeID}
                onChange={(e) => setForm((p) => ({ ...p, employeeID: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="workerType" className={labelClass}>
                Worker Type
              </label>
              <input
                id="workerType"
                type="text"
                required
                value={form.workerType}
                onChange={(e) => setForm((p) => ({ ...p, workerType: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="managerID" className={labelClass}>
                Manager ID
              </label>
              <input
                id="managerID"
                type="text"
                value={form.managerID}
                onChange={(e) => setForm((p) => ({ ...p, managerID: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="phoneNumberWork" className={labelClass}>
                Work Phone
              </label>
              <input
                id="phoneNumberWork"
                type="text"
                value={form.phoneNumberWork}
                onChange={(e) => setForm((p) => ({ ...p, phoneNumberWork: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="phoneNumberHome" className={labelClass}>
                Home Phone
              </label>
              <input
                id="phoneNumberHome"
                type="text"
                value={form.phoneNumberHome}
                onChange={(e) => setForm((p) => ({ ...p, phoneNumberHome: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="organizationName" className={labelClass}>
                Organization Name
              </label>
              <input
                id="organizationName"
                type="text"
                value={form.organizationName}
                onChange={(e) => setForm((p) => ({ ...p, organizationName: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="costCenterId" className={labelClass}>
                Cost Center ID
              </label>
              <input
                id="costCenterId"
                type="text"
                value={form.costCenterId}
                onChange={(e) => setForm((p) => ({ ...p, costCenterId: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="streetAddress" className={labelClass}>
                Street Address
              </label>
              <input
                id="streetAddress"
                type="text"
                value={form.streetAddress}
                onChange={(e) => setForm((p) => ({ ...p, streetAddress: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                type="text"
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>
                State
              </label>
              <input
                id="state"
                type="text"
                value={form.state}
                onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="country" className={labelClass}>
                Country
              </label>
              <input
                id="country"
                type="text"
                value={form.country}
                onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="postalCode" className={labelClass}>
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                value={form.postalCode}
                onChange={(e) => setForm((p) => ({ ...p, postalCode: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="continousServiceDate" className={labelClass}>
                Start Date
              </label>
              <input
                id="continousServiceDate"
                type="date"
                value={form.continousServiceDate}
                onChange={(e) => setForm((p) => ({ ...p, continousServiceDate: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
            </div>
            <div>
              <label htmlFor="terminationDate" className={labelClass}>
                Termination Date
              </label>
              <input
                id="terminationDate"
                type="date"
                value={form.terminationDate}
                onChange={(e) => setForm((p) => ({ ...p, terminationDate: e.target.value }))}
                className={isTerminatedView ? inputDisabledClass : inputClass}
                disabled={isTerminatedView}
              />
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

      {successModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-dialog-title"
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800">
            <h3
              id="success-dialog-title"
              className="text-lg font-semibold text-slate-900 dark:text-slate-50"
            >
              Success
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{successMessage}</p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleSuccessModalOk}
                className="rounded-lg bg-[#0045ff] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0045ff] focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
