import Link from "next/link";
import { AlertCircle, CheckCircle2, ChevronDown, Clock3, ListChecks, PlusCircle, Search } from "lucide-react";
import type { ReactNode } from "react";

import { AdminPageToasts } from "@/components/admin/admin-page-toasts";
import { ManageOffersTable } from "@/components/admin/manage-offers-table";
import { getAdminOffersAllPagesServer, getAdminOffersServer, getAllMasterDataServer } from "@/lib/api/backend";
import { getDaysLeft, getOfferStatus } from "@/lib/admin/mock-offers";

const numberFormat = new Intl.NumberFormat("en-US");

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: "all" | "active" | "upcoming" | "expired" | "inactive";
    category?: string;
    offerType?: string;
    merchant?: string;
    bank?: string;
    location?: string;
    sort?: "startDesc" | "startAsc" | "endAsc" | "titleAsc" | "titleDesc";
    page?: string;
    pageSize?: string;
    deactivated?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();
  const status = params.status ?? "all";
  const category = params.category ?? "all";
  const offerType = params.offerType ?? "all";
  const merchant = params.merchant ?? "all";
  const bank = params.bank ?? "all";
  const location = params.location ?? "all";
  const sort = params.sort ?? "startDesc";
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const pageSize = Math.min(50, Math.max(5, Number(params.pageSize ?? "10") || 10));
  const deactivated = params.deactivated === "1";
  const hasError = params.error === "1";
  const [masterData, allMeta, activeMeta, expiredMeta] = await Promise.all([
    getAllMasterDataServer(),
    getAdminOffersServer(new URLSearchParams({ page: "1", pageSize: "1", status: "all" })),
    getAdminOffersServer(new URLSearchParams({ page: "1", pageSize: "1", status: "active" })),
    getAdminOffersServer(new URLSearchParams({ page: "1", pageSize: "1", status: "expired" })),
  ]);

  const query = new URLSearchParams({ sort });
  if (q) query.set("q", params.q ?? "");
  if (status !== "all") query.set("status", status);
  if (category !== "all") query.set("category", category);
  if (offerType !== "all") query.set("offerType", offerType);
  if (merchant !== "all") query.set("merchant", merchant);
  if (bank !== "all") query.set("bank", bank);
  if (location !== "all") query.set("location", location);

  const allFilteredOffers = await getAdminOffersAllPagesServer(query);
  const totalFilteredOffers = allFilteredOffers.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredOffers / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const filteredOffers = allFilteredOffers.slice(startIndex, startIndex + pageSize);
  const visibleStart = filteredOffers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const visibleEnd = visibleStart === 0 ? 0 : visibleStart - 1 + filteredOffers.length;

  const categories = masterData.categories.filter((item) => item.status === "active");
  const offerTypes = masterData.offerTypes.filter((item) => item.status === "active");
  const merchants = masterData.merchants.filter((item) => item.status === "active");
  const banks = masterData.banks.filter((item) => item.status === "active");
  const locations = masterData.locations.filter((item) => item.status === "active");
  const nameById = Object.fromEntries(
    [
      ...masterData.offerTypes,
      ...masterData.categories,
      ...masterData.merchants,
      ...masterData.payments,
      ...masterData.banks,
      ...masterData.locations,
    ].map((item) => [item.id, item.name]),
  );
  const expiringSoon = filteredOffers.filter(
    (offer) => getOfferStatus(offer) === "active" && getDaysLeft(offer) <= 7,
  ).length;

  const getPageHref = (targetPage: number): string => {
    const query = new URLSearchParams();
    if (params.q) query.set("q", params.q);
    if (status !== "all") query.set("status", status);
    if (category !== "all") query.set("category", category);
    if (offerType !== "all") query.set("offerType", offerType);
    if (merchant !== "all") query.set("merchant", merchant);
    if (bank !== "all") query.set("bank", bank);
    if (location !== "all") query.set("location", location);
    if (sort !== "startDesc") query.set("sort", sort);
    query.set("pageSize", String(pageSize));
    query.set("page", String(targetPage));
    return `/admin/dashboard?${query.toString()}`;
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Offers Dashboard</h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">Manage offers and related master data.</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 lg:w-auto lg:grid-cols-none lg:grid-flow-col lg:auto-cols-max lg:justify-end lg:self-end">
          <Link
            href="/admin/master-data?open=offer-type"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
          >
            Add Offer Type
          </Link>
          <Link
            href="/admin/master-data?open=category"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
          >
            Add Category
          </Link>
          <Link
            href="/admin/master-data?open=merchant"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
          >
            Add Merchant
          </Link>
          <Link
            href="/admin/master-data?open=bank"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
          >
            Add Bank
          </Link>
          <Link
            href="/admin/master-data?open=location"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
          >
            Add Location
          </Link>
          <Link
            href="/admin/offers"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700 sm:text-sm"
          >
            <PlusCircle className="h-4 w-4" />
            Add Offer
          </Link>
        </div>
      </div>
      <AdminPageToasts
        toasts={[
          {
            show: deactivated,
            type: "success",
            message: "Offer marked as inactive successfully.",
          },
          {
            show: hasError,
            type: "error",
            message: "Missing required fields. Please provide title, dates, description, and banner image.",
          },
        ]}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<ListChecks className="h-5 w-5" />}
          label="Total offers"
          value={numberFormat.format(allMeta.meta.totalItems)}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Active offers"
          value={numberFormat.format(activeMeta.meta.totalItems)}
        />
        <StatCard
          icon={<Clock3 className="h-5 w-5" />}
          label="Expiring in 7 days"
          value={numberFormat.format(expiringSoon)}
        />
        <StatCard
          icon={<AlertCircle className="h-5 w-5" />}
          label="Expired offers"
          value={numberFormat.format(expiredMeta.meta.totalItems)}
        />
      </section>

      <section>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold sm:text-xl">Manage Offers</h2>
            <form className="grid w-full gap-2 md:grid-cols-2 xl:grid-cols-4" action="/admin/dashboard" method="get">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  name="q"
                  defaultValue={params.q ?? ""}
                  placeholder="Search by offer or company"
                  className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
                />
              </div>

              <SelectField name="status" defaultValue={status}>
                <option value="all">All status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="expired">Expired</option>
                <option value="inactive">Inactive</option>
              </SelectField>

              <SelectField name="sort" defaultValue={sort}>
                <option value="startDesc">Newest start date</option>
                <option value="startAsc">Oldest start date</option>
                <option value="endAsc">Ending soon</option>
                <option value="titleAsc">Title A-Z</option>
                <option value="titleDesc">Title Z-A</option>
              </SelectField>

              <SelectField name="category" defaultValue={category}>
                <option value="all">All categories</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField>

              <SelectField name="offerType" defaultValue={offerType}>
                <option value="all">All offer types</option>
                {offerTypes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField>

              <SelectField name="merchant" defaultValue={merchant}>
                <option value="all">All merchants</option>
                {merchants.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField>

              <SelectField name="bank" defaultValue={bank}>
                <option value="all">All banks</option>
                {banks.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField>

              <SelectField name="location" defaultValue={location}>
                <option value="all">All locations</option>
                {locations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField>

              <SelectField name="pageSize" defaultValue={String(pageSize)}>
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
              </SelectField>

              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Apply filters
              </button>
            </form>
          </div>
          <p className="mb-4 text-sm text-slate-600">
            Showing {visibleStart}-{visibleEnd} of {totalFilteredOffers} filtered offers ({allMeta.meta.totalItems} total).
          </p>
          <ManageOffersTable offers={filteredOffers} nameById={nameById} />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Link
                href={getPageHref(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage <= 1}
                className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                  currentPage <= 1
                    ? "pointer-events-none border-slate-200 text-slate-400"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Previous
              </Link>
              <Link
                href={getPageHref(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage >= totalPages}
                className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                  currentPage >= totalPages
                    ? "pointer-events-none border-slate-200 text-slate-400"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SelectField({
  name,
  defaultValue,
  children,
}: {
  name: string;
  defaultValue: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm outline-none ring-sky-500/30 focus:border-sky-500 focus:ring-2"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
        <p className="text-xs font-medium text-slate-600 sm:text-sm">{label}</p>
        <span className="text-sky-700">{icon}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{value}</p>
    </div>
  );
}
