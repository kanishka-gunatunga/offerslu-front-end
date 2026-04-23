import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { checkAdminSessionServer } from "@/lib/api/backend";
import { AdminBrand } from "@/components/admin/admin-brand";
import { AdminMobileSidebar } from "@/components/admin/admin-mobile-sidebar";
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";

import { adminLogoutAction } from "../_actions";

export default async function AdminPrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await checkAdminSessionServer())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="hidden border-r border-slate-200 bg-white md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-52 md:flex-col md:justify-between md:p-3">
        <div>
          <div className="inline-flex rounded-xl bg-black/70 p-2 backdrop-blur-sm">
            <AdminBrand compact />
          </div>
          <div className="mt-6">
            <AdminSidebarNav />
          </div>
        </div>
        <form action={adminLogoutAction}>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </aside>

      <div className="min-h-screen md:ml-52">
        <AdminMobileSidebar logoutAction={adminLogoutAction} />

        <main className="px-4 pb-8 pt-20 sm:px-6 md:px-8 md:pt-8">{children}</main>
      </div>
    </div>
  );
}
