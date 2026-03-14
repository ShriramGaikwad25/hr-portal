export default function EmployeesPage() {
  return (
    <div className="px-6 py-8 lg:px-10 lg:py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Employees
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          View and manage your team members. This page can list employees, add new ones, and edit details.
        </p>
      </section>
    </div>
  );
}
