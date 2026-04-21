import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ siteName }: { siteName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-slate-900">
          <span className="rounded-lg bg-[#0b63d8] px-2.5 py-1.5 shadow-sm ring-1 ring-[#0b63d8]/30">
            <Image src="/offerslu-logo.svg" alt={`${siteName} logo`} width={140} height={32} />
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
            Offers
          </span>
        </Link>
      </div>
    </header>
  );
}
