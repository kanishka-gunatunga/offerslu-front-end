import Image from "next/image";
import Link from "next/link";

export function AdminBrand() {
  return (
    <Link href="/admin/dashboard" className="inline-flex items-center gap-3">
      <Image src="/offerslu-logo.svg" alt="Offerlu logo" width={140} height={32} priority />
      <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
        Admin
      </span>
    </Link>
  );
}
