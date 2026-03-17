"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarSection =
  | "employees"
  | "leave"
  | "payroll"
  | "benefits"
  | "performance"
  | "recruitment"
  | "reports"
  | "company"
  | "compliance"
  | "time";

type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<SidebarSection, boolean>>({
    employees: true,
    leave: false,
    payroll: false,
    benefits: false,
    performance: false,
    recruitment: false,
    reports: false,
    company: false,
    compliance: false,
    time: false,
  });

  function toggle(section: SidebarSection) {
    setExpanded((prev: Record<SidebarSection, boolean>) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    <aside className="fixed top-20 left-0 w-72 bg-white border-r h-[calc(100vh-80px)] overflow-y-auto shadow-inner pt-8 px-4">
      <div className="px-4 mb-8">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 text-indigo-700 font-semibold text-lg hover:text-indigo-900"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-50 text-xs">
            ⚙
          </span>
          <span>Administration</span>
        </Link>
      </div>

      <div className="space-y-8 text-sm">
        {/* Employee Management */}
        <div>
          <button
            type="button"
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link w-full text-left ${
              pathname.startsWith("/dashboard/employees") || pathname.startsWith("/dashboard/users")
                ? "bg-indigo-600 text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => toggle("employees")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">👥</span>
              <span className="font-medium">Employee Management</span>
            </span>
            <span className="text-xs">{expanded.employees ? "▾" : "▸"}</span>
          </button>
          {expanded.employees && (
            <div className="ml-9 mt-2 space-y-1 text-gray-600">
              <Link
                href="/dashboard/employees/manage"
                onClick={onClose}
                className={`block w-full text-left py-2 px-4 hover:text-indigo-600 ${
                  pathname.startsWith("/dashboard/employees/manage") || pathname.startsWith("/dashboard/users")
                    ? "text-indigo-600 font-semibold"
                    : ""
                }`}
              >
                Manage Employee
              </Link>
              <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
                Employee Directory
              </button>
              <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
                Bulk Import / Export
              </button>
            </div>
          )}
        </div>

        {/* Leave & Attendance */}
        <div>
          <button
            type="button"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => toggle("leave")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">📅</span>
              <span className="font-medium">Leave & Attendance</span>
            </span>
            <span className="text-xs">{expanded.leave ? "▾" : "▸"}</span>
          </button>
          {expanded.leave && (
          <div className="ml-9 mt-2 space-y-1 text-gray-600">
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Leave Requests (Approvals)
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Leave Balances &amp; Accruals
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Attendance Reports
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Holiday Calendar
            </button>
          </div>
          )}
        </div>

        {/* Payroll & Compensation */}
        <div>
          <button
            type="button"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => toggle("payroll")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">💵</span>
              <span className="font-medium">Payroll &amp; Compensation</span>
            </span>
            <span className="text-xs">{expanded.payroll ? "▾" : "▸"}</span>
          </button>
          {expanded.payroll && (
          <div className="ml-9 mt-2 space-y-1 text-gray-600">
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">Run Payroll</button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Payslip Management
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Salary Structure Setup
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Bonus &amp; Incentives
            </button>
          </div>
          )}
        </div>

        {/* Benefits Administration */}
        <div>
          <button
            type="button"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => toggle("benefits")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">❤️</span>
              <span className="font-medium">Benefits Administration</span>
            </span>
            <span className="text-xs">{expanded.benefits ? "▾" : "▸"}</span>
          </button>
          {expanded.benefits && (
          <div className="ml-9 mt-2 space-y-1 text-gray-600">
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Benefits Enrollment
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Carrier Management
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Open Enrollment Setup
            </button>
          </div>
          )}
        </div>

        {/* Performance & Talent */}
        <div>
          <button
            type="button"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => toggle("performance")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">📈</span>
              <span className="font-medium">Performance &amp; Talent</span>
            </span>
            <span className="text-xs">{expanded.performance ? "▾" : "▸"}</span>
          </button>
          {expanded.performance && (
          <div className="ml-9 mt-2 space-y-1 text-gray-600">
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Performance Reviews
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">Goal Setting</button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Succession Planning
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Training &amp; Development
            </button>
          </div>
          )}
        </div>

        {/* Recruitment */}
        <div>
          <button
            type="button"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => toggle("recruitment")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">🧳</span>
              <span className="font-medium">Recruitment</span>
            </span>
            <span className="text-xs">{expanded.recruitment ? "▾" : "▸"}</span>
          </button>
          {expanded.recruitment && (
          <div className="ml-9 mt-2 space-y-1 text-gray-600">
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">Job Postings</button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Applicant Tracking
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Interview Scheduler
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">Offer Letters</button>
          </div>
          )}
        </div>

        {/* Reports & Analytics */}
        <div>
          <button
            type="button"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => toggle("reports")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">📊</span>
              <span className="font-medium">Reports &amp; Analytics</span>
            </span>
            <span className="text-xs">{expanded.reports ? "▾" : "▸"}</span>
          </button>
          {expanded.reports && (
          <div className="ml-9 mt-2 space-y-1 text-gray-600">
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Custom Reports
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Headcount Reports
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Turnover Analytics
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Diversity Reports
            </button>
          </div>
          )}
        </div>

        {/* Company Settings */}
        <div>
          <button
            type="button"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => toggle("company")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">🏢</span>
              <span className="font-medium">Company Settings</span>
            </span>
            <span className="text-xs">{expanded.company ? "▾" : "▸"}</span>
          </button>
          {expanded.company && (
          <div className="ml-9 mt-2 space-y-1 text-gray-600">
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Departments &amp; Locations
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Org Chart Management
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              User Roles &amp; Permissions
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Email Templates
            </button>
          </div>
          )}
        </div>

        {/* Compliance & Documents */}
        <div>
          <button
            type="button"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => toggle("compliance")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">📑</span>
              <span className="font-medium">Compliance &amp; Documents</span>
            </span>
            <span className="text-xs">{expanded.compliance ? "▾" : "▸"}</span>
          </button>
          {expanded.compliance && (
          <div className="ml-9 mt-2 space-y-1 text-gray-600">
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Document Library
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              I-9 / W-4 Management
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">Audit Logs</button>
          </div>
          )}
        </div>

        {/* Time & Attendance */}
        <div>
          <button
            type="button"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl sidebar-link text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => toggle("time")}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-center">⏰</span>
              <span className="font-medium">Time &amp; Attendance</span>
            </span>
            <span className="text-xs">{expanded.time ? "▾" : "▸"}</span>
          </button>
          {expanded.time && (
          <div className="ml-9 mt-2 space-y-1 text-gray-600">
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Time Clock Setup
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">
              Shift Scheduling
            </button>
            <button className="block w-full text-left py-2 px-4 hover:text-indigo-600">Overtime Rules</button>
          </div>
          )}
        </div>
      </div>

      <div className="mt-10 px-6 text-xs text-gray-400">
        © 2026 Acme Corp • Admin v1.2
      </div>
    </aside>
  );
}
