import Link from "next/link";
import { AlertCircle, CheckCircle2, FilePenLine, PlusCircle } from "lucide-react";

import { AddOfferForm } from "@/components/admin/add-offer-form";
import { adminMockOffers } from "@/lib/admin/mock-offers";

export default async function AdminOffersPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    error?: string;
    deactivated?: string;
    edit?: string;
  }>;
}) {
  const params = await searchParams;
  const created = params.created === "1";
  const updated = params.updated === "1";
  const hasError = params.error === "1";
  const deactivated = params.deactivated === "1";
  const editId = params.edit ?? "";
  const selectedOffer = adminMockOffers.find((offer) => offer.id === editId);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Add / Edit Offers</h1>
          <p className="mt-2 text-sm text-slate-600">
            Use one page to create new offers or load existing offers to edit.
          </p>
        </div>
        <Link
          href="/admin/dashboard"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back to dashboard
        </Link>
      </div>

      {created ? (
        <p className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">
          <CheckCircle2 className="h-4 w-4" />
          Offer saved successfully.
        </p>
      ) : null}
      {updated ? (
        <p className="inline-flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-800 ring-1 ring-sky-200">
          <CheckCircle2 className="h-4 w-4" />
          Offer updated successfully.
        </p>
      ) : null}
      {hasError ? (
        <p className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800 ring-1 ring-red-200">
          <AlertCircle className="h-4 w-4" />
          Missing required fields. Please complete and try again.
        </p>
      ) : null}
      {deactivated ? (
        <p className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
          <CheckCircle2 className="h-4 w-4" />
          Offer deactivated successfully.
        </p>
      ) : null}

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">
              {selectedOffer ? "Edit Offer" : "Add Offer"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {selectedOffer
                ? `Editing ${selectedOffer.title}`
                : "Create a new offer entry with full offer details."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedOffer ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                <FilePenLine className="h-3.5 w-3.5" />
                Edit mode
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                <PlusCircle className="h-3.5 w-3.5" />
                New
              </span>
            )}
          </div>
        </div>
        <AddOfferForm
          initialValues={selectedOffer}
          submitLabel={selectedOffer ? "Save changes" : "Add offer"}
        />
      </section>
    </div>
  );
}
