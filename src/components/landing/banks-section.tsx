import Image from "next/image";
import { Open_Sans } from "next/font/google";

import type { Bank } from "@/lib/site/types";

const openSans = Open_Sans({
  weight: ["600"],
  subsets: ["latin"],
});

export function BanksSection({ banks }: { banks: Bank[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="text-center">
        <h2
          className={`${openSans.className} text-[clamp(1.35rem,3vw,30px)] font-semibold leading-6 tracking-normal text-black`}
        >
          Offers by Bank
        </h2>
        <p
          className={`${openSans.className} mt-2 text-[clamp(0.95rem,2.1vw,19px)] font-semibold leading-6 tracking-normal text-[#787878]`}
        >
          Bank your bank offers first
        </p>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-5">
        {banks.map((b) => (
          <div
            key={b.id}
            className="flex w-full max-w-[190px] flex-col rounded-[15px] border border-[#DDDDDD] bg-white p-3 sm:w-[186px]"
          >
            <div className="flex min-h-[118px] flex-1 items-center justify-center px-2 pb-2 pt-3 sm:min-h-[126px]">
              <div className="relative h-14 w-full max-w-[148px] overflow-hidden rounded-sm bg-white sm:h-16">
              <Image
                src={b.logoUrl}
                alt={b.name}
                fill
                className="object-contain"
                sizes="148px"
              />
              </div>
            </div>
            <div className="mt-auto text-center">
            <p className="text-[clamp(0.95rem,1.2vw,18px)] font-bold leading-normal text-[#1A1D29]">
              {b.name}
            </p>
            <p className="mt-1 text-[11px] font-semibold leading-none text-[#7B7B7B]">
              {b.offerCount} Offers
            </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
