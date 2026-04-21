import Image from "next/image";
import { CalendarDays, Clock3, Tag } from "lucide-react";

import { getDaysLeft } from "@/lib/admin/mock-offers";
import type { AdminOffer } from "@/lib/admin/types";

const shortDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export function OfferAdminCard({ offer }: { offer: AdminOffer }) {
  const daysLeft = getDaysLeft(offer);

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-200/90">
      <div className="relative h-40 w-full bg-slate-100">
        <Image src={offer.heroImageUrl} alt="" fill sizes="450px" className="object-cover" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center gap-2">
          <Image
            src={offer.companyLogoUrl}
            alt=""
            width={26}
            height={26}
            className="rounded-md ring-1 ring-slate-200"
          />
          <p className="text-sm font-medium text-slate-600">{offer.companyName}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{offer.title}</h3>
          <p className="mt-3 text-lg leading-8 text-slate-700">{offer.description}</p>
        </div>
        <div className="flex flex-wrap gap-5 text-lg text-slate-700">
          <span className="inline-flex items-center gap-1.5">
            <Tag className="h-5 w-5" />
            {offer.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Tag className="h-5 w-5" />
            {offer.offerType}
          </span>
        </div>
        <div className="border-t border-slate-200 pt-4">
          <p className="inline-flex items-center gap-2 text-lg text-slate-500">
            <CalendarDays className="h-5 w-5" />
            {shortDate.format(new Date(offer.startDate))} -{" "}
            {shortDate.format(new Date(offer.endDate))}
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-2xl font-medium text-red-500">
            <Clock3 className="h-6 w-6" />
            {daysLeft} days left
          </p>
        </div>
      </div>
    </article>
  );
}
