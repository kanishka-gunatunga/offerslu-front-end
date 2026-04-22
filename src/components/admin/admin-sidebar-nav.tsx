"use client";

import Link from "next/link";
import { LayoutGrid, MapPin, Shapes, Tags } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin/offers", label: "Offers", icon: Tags },
  { href: "/admin/master-data", label: "Master Data", icon: Shapes },
  { href: "/", label: "View Site", icon: MapPin, external: true },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebarNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={mobile ? "flex items-center gap-2" : "space-y-1"}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);
        const className = mobile
          ? `inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-sky-100 text-sky-800 ring-1 ring-sky-200"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            }`
          : `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-sky-100 text-sky-800 ring-1 ring-sky-200"
                : "text-slate-700 hover:bg-slate-100"
            }`;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={className}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
