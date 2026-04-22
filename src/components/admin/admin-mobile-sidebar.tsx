"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { AdminBrand } from "@/components/admin/admin-brand";
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";

export function AdminMobileSidebar({
  logoutAction,
}: {
  logoutAction: (formData: FormData) => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
          <div className="rounded-xl bg-black/70 p-2 backdrop-blur-sm">
            <AdminBrand compact />
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/45"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-60 flex-col justify-between border-r border-slate-200 bg-white p-3 shadow-xl">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="inline-flex rounded-xl bg-black/70 p-2 backdrop-blur-sm">
                  <AdminBrand compact />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50"
                  aria-label="Close sidebar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <AdminSidebarNav />
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </button>
            </form>
          </aside>
        </div>
      ) : null}
    </>
  );
}
