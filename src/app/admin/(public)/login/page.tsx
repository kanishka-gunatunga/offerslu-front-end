import Link from "next/link";

import { AdminBrand } from "@/components/admin/admin-brand";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const showError = params.error === "1";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
        <div className="mb-8 flex justify-center">
          <AdminBrand />
        </div>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-sky-700">
          Staff only
        </p>
        <h1 className="mt-2 text-center text-2xl font-semibold text-slate-900">
          Admin sign in
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to manage offers shown on the public website.
        </p>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          {showError ? (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800 ring-1 ring-red-100">
              Incorrect password. Try again.
            </p>
          ) : null}
          <AdminLoginForm />
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          <Link href="/" className="font-medium text-sky-700 hover:text-sky-800">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
