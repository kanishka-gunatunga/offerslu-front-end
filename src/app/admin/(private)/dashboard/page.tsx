import Link from "next/link";
import { AlertCircle, CheckCircle2, Clock3, ListChecks, PlusCircle, Search } from "lucide-react";
import type { ReactNode } from "react";

import { ManageOffersTable } from "@/components/admin/manage-offers-table";
import { adminMockOffers, getOfferDashboardStats, getOfferStatus } from "@/lib/admin/mock-offers";

const numberFormat = new Intl.NumberFormat("en-US");

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: "all" | "active" | "upcoming" | "expired";
    category?: string;
    deactivated?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();
  const status = params.status ?? "all";
  const category = params.category ?? "all";
  const deactivated = params.deactivated === "1";
  const hasError = params.error === "1";
  const stats = getOfferDashboardStats(adminMockOffers);
  const categories = Array.from(new Set(adminMockOffers.map((offer) => offer.category)));
  const filteredOffers = adminMockOffers.filter((offer) => {
    const matchesQ =
      !q ||
      offer.title.toLowerCase().includes(q) ||
      offer.companyName.toLowerCase().includes(q);
    const matchesStatus = status === "all" || getOfferStatus(offer) === status;
    const matchesCategory = category === "all" || offer.category === category;
    return matchesQ && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Offers Dashboard</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Main focus is adding and monitoring offers from one place.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">Search, filter, and manage all offers.</p>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/master-data?open=category"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Add Category
          </Link>
          <Link
            href="/admin/master-data?open=merchant"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Add Merchant
          </Link>
          <Link
            href="/admin/master-data?open=bank"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Add Bank
          </Link>
          <Link
            href="/admin/master-data?open=location"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Add Location
          </Link>
          <Link
            href="/admin/offers"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            <PlusCircle className="h-4 w-4" />
            Add Offer
          </Link>
        </div>
      </div>
      {deactivated ? (
        <p className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
          <CheckCircle2 className="h-4 w-4" />
          Offer deactivated successfully.
        </p>
      ) : null}
      {hasError ? (
        <p className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800 ring-1 ring-red-200">
          <AlertCircle className="h-4 w-4" />
          Missing required fields. Please complete the form and try again.
        </p>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<ListChecks className="h-5 w-5" />}
          label="Total offers"
          value={numberFormat.format(stats.totalOffers)}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Active offers"
          value={numberFormat.format(stats.activeOffers)}
        />
        <StatCard
          icon={<Clock3 className="h-5 w-5" />}
          label="Expiring in 7 days"
          value={numberFormat.format(stats.expiringSoon)}
        />
        <StatCard
          icon={<AlertCircle className="h-5 w-5" />}
          label="Expired offers"
          value={numberFormat.format(stats.expiredOffers)}
        />
      </section>

      <section>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Manage Offers</h2>
            <form className="flex flex-wrap items-center gap-2" action="/admin/dashboard" method="get">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  name="q"
                  defaultValue={params.q ?? ""}
                  placeholder="Search by offer or company"
                  className="w-64 rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
                />
              </div>
              <select
                name="status"
                defaultValue={status}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
              >
                <option value="all">All status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="expired">Expired</option>
              </select>
              <select
                name="category"
                defaultValue={category}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
              >
                <option value="all">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Apply
              </button>
            </form>
          </div>
          <p className="mb-4 text-sm text-slate-600">
            Showing {filteredOffers.length} of {adminMockOffers.length} offers.
          </p>
          <ManageOffersTable offers={filteredOffers} />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <span className="text-sky-700">{icon}</span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
    </div>
  );
}
