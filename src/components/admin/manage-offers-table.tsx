"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Eye, PencilLine, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

import { deactivateOfferAction } from "@/app/admin/_actions";
import {
  bankOptions,
  categoryOptions,
  locationOptions,
  merchantOptions,
  offerTypeOptions,
  paymentOptions,
} from "@/lib/admin/master-data";
import { getOfferStatus } from "@/lib/admin/mock-offers";
import type { AdminOffer } from "@/lib/admin/types";

const shortDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function statusClasses(status: ReturnType<typeof getOfferStatus>) {
  if (status === "inactive") return "bg-rose-50 text-rose-700 ring-rose-200";
  if (status === "active") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "upcoming") return "bg-sky-50 text-sky-700 ring-sky-200";
  return "bg-slate-100 text-slate-600 ring-slate-200";
}

function flattenHierarchyOptions(
  items: typeof categoryOptions | typeof merchantOptions | typeof offerTypeOptions | typeof paymentOptions,
) {
  return items.flatMap((item) => [item, ...(item.children ?? [])]);
}

export function ManageOffersTable({
  offers,
  returnTo = "/admin/dashboard",
}: {
  offers: AdminOffer[];
  returnTo?: string;
}) {
  const [viewingOffer, setViewingOffer] = useState<AdminOffer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminOffer | null>(null);

  const idToNameMap = useMemo(() => {
    const map = new Map<string, string>();
    [
      ...flattenHierarchyOptions(offerTypeOptions),
      ...flattenHierarchyOptions(categoryOptions),
      ...flattenHierarchyOptions(merchantOptions),
      ...flattenHierarchyOptions(paymentOptions),
      ...bankOptions,
      ...locationOptions,
    ].forEach((item) => map.set(item.id, item.name));
    return map;
  }, []);

  const getNames = (ids: string[]) => ids.map((id) => idToNameMap.get(id) ?? id);

  return (
    <>
      <div className="space-y-3 lg:hidden">
        {offers.map((offer) => {
          const status = getOfferStatus(offer);
          return (
            <article key={offer.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{offer.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{offer.companyName}</p>
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${statusClasses(
                    status,
                  )}`}
                >
                  {status}
                </span>
              </div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-600">
                <CalendarDays className="h-4 w-4" />
                {shortDate.format(new Date(offer.startDate))} - {shortDate.format(new Date(offer.endDate))}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewingOffer(offer)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <Link
                  href={`/admin/offers?edit=${offer.id}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <PencilLine className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(offer)}
                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 lg:block">
        <div className="admin-scrollbar overflow-x-auto">
          <table className="w-full min-w-full table-auto divide-y divide-slate-200">
            <thead className="bg-slate-50/80">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="whitespace-nowrap px-4 py-3">Offer</th>
                <th className="whitespace-nowrap px-4 py-3">Category</th>
                <th className="whitespace-nowrap px-4 py-3">Type</th>
                <th className="whitespace-nowrap px-4 py-3">Dates</th>
                <th className="whitespace-nowrap px-4 py-3">Status</th>
                <th className="whitespace-nowrap px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {offers.map((offer) => {
                const status = getOfferStatus(offer);
                return (
                  <tr key={offer.id} className="align-top">
                    <td className="px-4 py-4">
                      <p className="max-w-88 truncate font-semibold text-slate-900" title={offer.title}>
                        {offer.title}
                      </p>
                      <p className="mt-1 max-w-88 truncate text-sm text-slate-500" title={offer.companyName}>
                        {offer.companyName}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      <span className="block truncate" title={offer.category}>
                        {offer.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      <span className="block truncate" title={offer.offerType}>
                        {offer.offerType}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                      <p className="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <CalendarDays className="h-4 w-4" />
                        {shortDate.format(new Date(offer.startDate))} -{" "}
                        {shortDate.format(new Date(offer.endDate))}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${statusClasses(
                          status,
                        )}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewingOffer(offer)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                        <Link
                          href={`/admin/offers?edit=${offer.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <PencilLine className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(offer)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {viewingOffer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
          <div className="admin-scrollbar max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{viewingOffer.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{viewingOffer.companyName}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewingOffer(null)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                aria-label="Close offer details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-5 overflow-hidden rounded-xl ring-1 ring-slate-200">
              <Image
                src={viewingOffer.heroImageUrl}
                alt={viewingOffer.title}
                width={1200}
                height={700}
                className="h-44 w-full object-cover sm:h-56"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailCard label="Offer Type">{getNames(viewingOffer.offerTypeIds).join(", ")}</DetailCard>
              <DetailCard label="Category">{getNames(viewingOffer.categoryIds).join(", ")}</DetailCard>
              <DetailCard label="Merchant">{getNames(viewingOffer.merchantIds).join(", ")}</DetailCard>
              <DetailCard label="Payment">{getNames(viewingOffer.paymentIds).join(", ")}</DetailCard>
              <DetailCard label="Bank">{getNames(viewingOffer.bankIds).join(", ")}</DetailCard>
              <DetailCard label="Location">{getNames(viewingOffer.locationIds).join(", ")}</DetailCard>
              <DetailCard label="Start Date">
                {shortDate.format(new Date(viewingOffer.startDate))}
              </DetailCard>
              <DetailCard label="End Date">{shortDate.format(new Date(viewingOffer.endDate))}</DetailCard>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</p>
              <p className="mt-2 text-sm text-slate-700">{viewingOffer.description}</p>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewingOffer(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <Link
                href={`/admin/offers?edit=${viewingOffer.id}`}
                className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              >
                <PencilLine className="h-4 w-4" />
                Edit offer
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Delete this offer?</h3>
            <p className="mt-2 text-sm text-slate-600">
              This will not permanently remove the record. It will be marked as inactive.
            </p>
            <p className="mt-2 text-sm font-medium text-slate-800">{deleteTarget.title}</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <form action={deactivateOfferAction}>
                <input type="hidden" name="offerId" value={deleteTarget.id} />
                <input type="hidden" name="returnTo" value={returnTo} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function DetailCard({ label, children }: { label: string; children: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-700">{children || "-"}</p>
    </div>
  );
}
