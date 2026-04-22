import Image from "next/image";
import Link from "next/link";

export function AdminBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/admin/dashboard"
      className={`flex items-center leading-none ${compact ? "gap-2.5" : "gap-3"}`}
    >
      <Image
        src="/offerslu-logo.svg"
        alt="Offerlu logo"
        width={compact ? 112 : 140}
        height={compact ? 24 : 32}
        priority
        className={`block w-auto ${compact ? "h-6" : "h-8"}`}
      />
      <span
        className={`rounded-full bg-sky-50 font-semibold text-sky-700 ring-1 ring-sky-100 ${
          compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
        }`}
      >
        Admin
      </span>
    </Link>
  );
}
