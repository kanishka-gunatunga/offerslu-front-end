import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-session";
import { AdminBrand } from "@/components/admin/admin-brand";

import { adminLogoutAction } from "../_actions";

export default async function AdminPrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-10">
            <AdminBrand />
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
              <Link href="/admin/dashboard" className="text-white/85 hover:text-white">
                Dashboard
              </Link>
              <Link href="/admin/offers" className="text-white/85 hover:text-white">
                Offers
              </Link>
              <Link href="/admin/master-data" className="text-white/85 hover:text-white">
                Master data
              </Link>
              <Link
                href="/admin/offers"
                className="rounded-full bg-sky-500/90 px-3 py-1 text-white hover:bg-sky-500"
              >
                Add Offer
              </Link>
              <Link
                href="/"
                className="text-sky-300 hover:text-sky-200"
                target="_blank"
                rel="noreferrer"
              >
                View site
              </Link>
            </nav>
          </div>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">{children}</div>
    </div>
  );
}
