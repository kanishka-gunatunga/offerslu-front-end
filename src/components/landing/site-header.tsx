import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ siteName }: { siteName: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[88rem] items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-white">
          <Image src="/offerslu-logo.svg" alt={`${siteName} logo`} width={140} height={32} />
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/20">
            Offers
          </span>
        </Link>
      </div>
    </header>
  );
}
