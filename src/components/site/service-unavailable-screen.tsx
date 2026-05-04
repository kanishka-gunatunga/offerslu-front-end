"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ServiceUnavailableScreenProps = {
  variant?: "fullscreen" | "embedded";
  onRetry?: () => void;
};

export function ServiceUnavailableScreen({
  variant = "fullscreen",
  onRetry,
}: ServiceUnavailableScreenProps) {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }
    router.refresh();
  };

  const inner = (
    <div className="mx-auto max-w-md px-6 text-center">
      <div className="mb-6 flex justify-center">
        <Image
          src="/logo-blue.png"
          alt="Offerslu.lk"
          width={175}
          height={80}
          className="h-8 w-auto opacity-90"
        />
      </div>
      <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
        We can’t load the site right now
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        This is usually temporary. Please try again in a moment. If it keeps happening, check your internet
        connection or try again later.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={handleRetry}
          className="rounded-xl bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0052cc]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Go to home
        </Link>
      </div>
    </div>
  );

  if (variant === "embedded") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center py-12">
        {inner}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[#fbfcff] py-16">
      {inner}
    </div>
  );
}
