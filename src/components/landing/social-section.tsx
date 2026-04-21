import type { SocialLink } from "@/lib/site/types";

function SocialGlyph({ icon }: { icon: SocialLink["icon"] }) {
  const common = "h-6 w-6";
  switch (icon) {
    case "facebook":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-.83 0-1.5.67-1.5 1.5V12h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8A3.6 3.6 0 0 0 20 16.4V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M10 15l5.19-3L10 9v6m11.56-7.83c.09.47.13.96.13 1.47v6.72c0 5.05-4.05 9.2-9.05 9.64-4.52.38-8.64-2.53-9.64-6.64-.09-.47-.13-.96-.13-1.47V9.33c0-5.05 4.05-9.2 9.05-9.64 4.52-.38 8.64 2.53 9.64 6.64z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
          />
        </svg>
      );
    case "x":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function SocialSection({ links }: { links: SocialLink[] }) {
  return (
    <section className="border-t border-slate-100 bg-slate-50/60 py-14">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Connect with us
          </h2>
          <p className="mt-2 text-slate-600">Follow updates and new drops.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.url}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm shadow-sky-500/25">
                <SocialGlyph icon={l.icon} />
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {l.platform}
              </span>
              <span className="text-xs font-medium text-sky-700">Follow us</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
