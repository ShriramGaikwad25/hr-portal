"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(sessionStorage.getItem("hr-portal-user"));
  }, []);

  return (
    <div className="px-6 pt-4 pb-8 lg:px-10 lg:pt-6 lg:pb-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-10">
        Welcome back,{" "}
        <span className="font-semibold">
          {userId ?? "Lisa"}
        </span>{" "}
        • March 17, 2026
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-3xl shadow p-8">
          <div className="flex justify-between">
            <div>
              <p className="text-5xl font-bold text-indigo-600">487</p>
              <p className="text-gray-600">Total Employees</p>
            </div>
            <span className="text-4xl text-indigo-200">👥</span>
          </div>
          <p className="text-emerald-600 text-sm mt-4">↑ 12 this month</p>
        </div>
        <div className="bg-white rounded-3xl shadow p-8">
          <div className="flex justify-between">
            <div>
              <p className="text-5xl font-bold text-amber-600">14</p>
              <p className="text-gray-600">Open Requisitions</p>
            </div>
            <span className="text-4xl text-amber-200">💼</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow p-8">
          <div className="flex justify-between">
            <div>
              <p className="text-5xl font-bold text-rose-600">23</p>
              <p className="text-gray-600">Pending Approvals</p>
            </div>
            <span className="text-4xl text-rose-200">⏳</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow p-8">
          <div className="flex justify-between">
            <div>
              <p className="text-5xl font-bold text-teal-600">8</p>
              <p className="text-gray-600">New Hires This Month</p>
            </div>
            <span className="text-4xl text-teal-200">➕</span>
          </div>
        </div>
      </div>

      {/* Pending Items */}
      <div className="bg-white rounded-3xl shadow p-8 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Pending Actions (23)</h2>
          <button
            type="button"
            onClick={() => alert("All approvals processed (demo)")}
            className="text-sm bg-indigo-600 text-white px-6 py-3 rounded-2xl"
          >
            Approve All
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-xs text-gray-500">
              <th className="pb-4">Request</th>
              <th className="pb-4">Employee</th>
              <th className="pb-4">Type</th>
              <th className="pb-4">Date</th>
              <th className="pb-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b">
              <td className="py-5">Leave Request</td>
              <td>Mike Chen</td>
              <td>Vacation (5 days)</td>
              <td>Mar 16</td>
              <td className="text-center">
                <button
                  type="button"
                  onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.textContent = "✅ Approved";
                    btn.classList.add("text-emerald-600");
                  }}
                  className="text-indigo-600 font-medium"
                >
                  Approve
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-5">Expense Claim</td>
              <td>Sarah Patel</td>
              <td>Travel - $1,240</td>
              <td>Mar 15</td>
              <td className="text-center">
                <button
                  type="button"
                  onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.textContent = "✅ Approved";
                    btn.classList.add("text-emerald-600");
                  }}
                  className="text-indigo-600 font-medium"
                >
                  Approve
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-5">Performance Review</td>
              <td>Emma Rodriguez</td>
              <td>Q1 Review</td>
              <td>Mar 14</td>
              <td className="text-center">
                <button
                  type="button"
                  onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.textContent = "✅ Approved";
                    btn.classList.add("text-emerald-600");
                  }}
                  className="text-indigo-600 font-medium"
                >
                  Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Links & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="font-semibold text-xl mb-6">Quick Admin Links</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <button
              type="button"
              onClick={() => alert("Navigating to Add Employee (demo)")}
              className="flex items-center gap-3 p-5 border rounded-3xl hover:bg-gray-50 text-left"
            >
              <span className="text-indigo-600">👤➕</span>
              <span>Add New Employee</span>
            </button>
            <button
              type="button"
              onClick={() => alert("Navigating to Run Payroll (demo)")}
              className="flex items-center gap-3 p-5 border rounded-3xl hover:bg-gray-50 text-left"
            >
              <span className="text-indigo-600">💵</span>
              <span>Run March Payroll</span>
            </button>
            <button
              type="button"
              onClick={() => alert("Navigating to Job Postings (demo)")}
              className="flex items-center gap-3 p-5 border rounded-3xl hover:bg-gray-50 text-left"
            >
              <span className="text-indigo-600">💼</span>
              <span>Post New Job</span>
            </button>
            <button
              type="button"
              onClick={() => alert("Navigating to Reports (demo)")}
              className="flex items-center gap-3 p-5 border rounded-3xl hover:bg-gray-50 text-left"
            >
              <span className="text-indigo-600">📊</span>
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="font-semibold text-xl mb-6">Recent Activity</h2>
          <div className="space-y-6 text-sm">
            <div className="flex gap-4">
              <div className="text-emerald-600">✅</div>
              <div className="flex-1">Sarah Patel approved leave for Mike Chen</div>
              <div className="text-gray-400 text-xs">2h ago</div>
            </div>
            <div className="flex gap-4">
              <div className="text-blue-600">🧑‍💼</div>
              <div className="flex-1">New employee “Jordan Lee” onboarded</div>
              <div className="text-gray-400 text-xs">Yesterday</div>
            </div>
            <div className="flex gap-4">
              <div className="text-amber-600">📄</div>
              <div className="flex-1">Bulk salary update completed</div>
              <div className="text-gray-400 text-xs">Mar 15</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
