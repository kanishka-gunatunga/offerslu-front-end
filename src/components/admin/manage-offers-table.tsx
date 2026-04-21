import Link from "next/link";
import { CalendarDays, PencilLine, Power } from "lucide-react";

import { deactivateOfferAction } from "@/app/admin/_actions";
import { getOfferStatus } from "@/lib/admin/mock-offers";
import type { AdminOffer } from "@/lib/admin/types";

const shortDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function statusClasses(status: ReturnType<typeof getOfferStatus>) {
  if (status === "active") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "upcoming") return "bg-sky-50 text-sky-700 ring-sky-200";
  return "bg-slate-100 text-slate-600 ring-slate-200";
}

export function ManageOffersTable({
  offers,
  returnTo = "/admin/dashboard",
}: {
  offers: AdminOffer[];
  returnTo?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Offer</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {offers.map((offer) => {
              const status = getOfferStatus(offer);
              return (
                <tr key={offer.id} className="align-top">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900">{offer.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{offer.companyName}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{offer.category}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{offer.offerType}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    <p className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      {shortDate.format(new Date(offer.startDate))} -{" "}
                      {shortDate.format(new Date(offer.endDate))}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses(
                        status,
                      )}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/admin/offers?edit=${offer.id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <PencilLine className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <form action={deactivateOfferAction}>
                        <input type="hidden" name="offerId" value={offer.id} />
                        <input type="hidden" name="returnTo" value={returnTo} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                        >
                          <Power className="h-3.5 w-3.5" />
                          Deactivate
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
