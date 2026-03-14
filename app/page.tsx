import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-semibold text-slate-800 dark:text-slate-100"
          >
            HR Portal
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Employees
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Leave
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Welcome to HR Portal
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Your central place for managing employees, leave requests, and company
            resources. Get started by exploring the dashboard or managing your
            team.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Go to Dashboard
            </Link>
            <Link
              href="#"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              View Employees
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
