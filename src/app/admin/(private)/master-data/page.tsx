import Link from "next/link";

import { MasterDataManager } from "@/components/admin/master-data-manager";
import { getAllMasterDataServer } from "@/lib/api/backend";

export default async function AdminMasterDataPage({
  searchParams,
}: {
  searchParams: Promise<{
    open?: "offer-type" | "category" | "merchant" | "payment" | "bank" | "location";
  }>;
}) {
  const params = await searchParams;
  const masterData = await getAllMasterDataServer();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Master Data</h1>
          <p className="mt-2 text-sm text-slate-600">
            Add and manage data for offer type, category, merchant, payment, bank, and location.
          </p>
        </div>
        <Link
          href="/admin/offers"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back to offers
        </Link>
      </div>

      <MasterDataManager open={params.open} initialData={masterData} />
    </div>
  );
}
